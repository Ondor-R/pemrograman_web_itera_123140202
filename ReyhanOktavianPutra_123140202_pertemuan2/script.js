class DashboardItem {
    constructor(content) {
        const now = new Date().getTime();
        this.id = `item-${now}-${Math.random()}`;
        this.content = content;
        this.createdAt = new Date();
    }
}

class StorageService {
    static async saveData(key, data) {
        return new Promise((resolve) => {
            const dataString = JSON.stringify(data);
            localStorage.setItem(key, dataString);
            resolve();
        });
    }

    static async loadData(key) {
        return new Promise((resolve) => {
            const dataString = localStorage.getItem(key);
            const data = JSON.parse(dataString) || [];
            resolve(data);
        });
    }
}

class App {
    constructor() {
        this.tasks = [];
        this.notes = [];

        this.taskForm = document.getElementById('task-form');
        this.noteForm = document.getElementById('note-form');
        this.taskInput = document.getElementById('task-input');
        this.noteInput = document.getElementById('note-input');
        this.taskList = document.getElementById('task-list');
        this.noteList = document.getElementById('note-list');

        this.clockTime = document.getElementById('clock-time');
        this.clockDate = document.getElementById('clock-date');
        this.weatherWidget = document.getElementById('weather-widget');
    }

    async init() {
        await this.loadAllData();
        this.renderAll();
        this.setupEventListeners();

        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        
        this.fetchWeather();
    }

    async loadAllData() {
        const [tasks, notes] = await Promise.all([
            StorageService.loadData('tasks'),
            StorageService.loadData('notes')
        ]);
        this.tasks = tasks;
        this.notes = notes;
    }

    setupEventListeners = () => {
        this.taskForm.addEventListener('submit', (e) => this.handleAddItem(e, 'tasks', this.taskInput));
        this.noteForm.addEventListener('submit', (e) => this.handleAddItem(e, 'notes', this.noteInput));
        this.taskList.addEventListener('click', (e) => this.handleListClick(e, 'tasks'));
        this.noteList.addEventListener('click', (e) => this.handleListClick(e, 'notes'));
    }

    handleAddItem = async (e, type, inputElement) => {
        e.preventDefault();
        const content = inputElement.value.trim();
        if (!content) return;

        const newItem = new DashboardItem(content);
        this[type].push(newItem);

        await StorageService.saveData(type, this[type]);
        this.renderItems(type);
        inputElement.value = '';
    }
    
    handleListClick = (e, type) => {
        const target = e.target;
        const itemElement = target.closest('.dashboard-item');
        if (!itemElement) return;

        const itemId = itemElement.dataset.id;

        if (target.classList.contains('delete-btn')) {
            this.deleteItem(type, itemId);
        } else if (target.classList.contains('edit-btn')) {
            this.editItem(type, itemId);
        }
    }

    deleteItem = async (type, id) => {
        this[type] = this[type].filter(item => item.id !== id);
        await StorageService.saveData(type, this[type]);
        this.renderItems(type);
    }

    editItem = async (type, id) => {
        const item = this[type].find(item => item.id === id);
        if (!item) return;

        const newContent = prompt('Edit item:', item.content);
        if (newContent !== null && newContent.trim() !== '') {
            item.content = newContent.trim();
        } else if (newContent === null) {
            return;
        }
        
        await StorageService.saveData(type, this[type]);
        this.renderItems(type);
    }

    renderAll = () => {
        this.renderItems('tasks');
        this.renderItems('notes');
    }

    renderItems = (type) => {
        let listElement = (type === 'tasks') ? this.taskList : this.noteList;
        let data = (type === 'tasks') ? this.tasks : this.notes;

        listElement.innerHTML = ''; 

        if (data.length === 0) {
            listElement.innerHTML = `<p class="empty-state">Tidak ada item</p>`;
            return;
        }

        const itemsHtml = data.map(item => `
            <div class="dashboard-item" data-id="${item.id}">
                <span>${item.content}</span> 
                <div class="item-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Hapus</button>
                </div>
            </div>
        `).join('');
        
        listElement.innerHTML = itemsHtml;
    }

    updateClock = () => {
        const now = new Date();

        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        
        this.clockTime.textContent = `${h}:${m}:${s}`;

        const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
        this.clockDate.textContent = now.toLocaleDateString('id-ID', options);
    }

    fetchWeather = async () => {
        const city = 'Lampung'; 
        
        try {
            const response = await fetch(`https://wttr.in/${city}?format=j1`);
            
            if (!response.ok) {
                throw new Error('Data cuaca tidak bisa diambil');
            }
            
            const data = await response.json();
            
            const current = data.current_condition[0];
            const temp = current.temp_C;
            const desc = current.weatherDesc[0].value;
            const feelsLike = current.FeelsLikeC;

            this.weatherWidget.innerHTML = `
                <span>${city}: <strong>${temp}°C</strong></span>
                <span>(${desc})</span>
                <span style="font-size: 0.8em; color: #bdc3c7;">Terasa seperti: ${feelsLike}°C</span>
            `;

        } catch (error) {
            console.error('Error fetching weather:', error);
            this.weatherWidget.textContent = 'Gagal memuat cuaca.';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});