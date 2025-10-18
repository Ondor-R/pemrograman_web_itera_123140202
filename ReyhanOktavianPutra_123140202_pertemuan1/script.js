document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskNameInput = document.getElementById('task-name');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const courseNameInput = document.getElementById('course-name');
    const editTaskIdInput = document.getElementById('edit-task-id');
    const submitBtn = document.getElementById('submit-btn');
    const searchInput = document.getElementById('search-input');
    const filterStatusSelect = document.getElementById('filter-status');
    const taskList = document.getElementById('task-list');
    const incompleteCountEl = document.getElementById('incomplete-count');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        
        const searchTerm = searchInput.value.toLowerCase();
        const filterStatus = filterStatusSelect.value;
        
        let filteredTasks = tasks.filter(task => {
            const statusMatch = (filterStatus === 'all') ||
                                (filterStatus === 'completed' && task.isCompleted) ||
                                (filterStatus === 'incomplete' && !task.isCompleted);
            
            const searchMatch = task.course.toLowerCase().includes(searchTerm) ||
                                task.name.toLowerCase().includes(searchTerm);
            
            return statusMatch && searchMatch;
        });

        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<li class="task-item">Tidak ada tugas yang sesuai.</li>';
        } else {
            filteredTasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.classList.add('task-item');
                taskItem.dataset.id = task.id;
                
                if (task.isCompleted) {
                    taskItem.classList.add('completed');
                }

                taskItem.innerHTML = `
                    <input type="checkbox" class="toggle-complete" ${task.isCompleted ? 'checked' : ''}>
                    <div class="task-details">
                        <strong>${task.name}</strong>
                        <small>${task.course} - Deadline: ${formatDate(task.deadline)}</small>
                    </div>
                    <div class="task-actions">
                        <button class="task-btn edit-btn">Edit</button>
                        <button class="task-btn delete-btn">Hapus</button>
                    </div>
                `;
                taskList.appendChild(taskItem);
            });
        }
        
        updateIncompleteCount();
    };

    const updateIncompleteCount = () => {
        const incompleteTasks = tasks.filter(task => !task.isCompleted).length;
        incompleteCountEl.textContent = `Tugas Belum Selesai: ${incompleteTasks}`;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const name = taskNameInput.value.trim();
        const course = courseNameInput.value.trim() || 'Umum';
        const deadline = taskDeadlineInput.value;
        const editingId = editTaskIdInput.value;
        
        if (!name || !deadline) {
            alert('Nama Tugas dan Deadline wajib diisi!');
            return;
        }
        
        if (editingId) {
            const taskIndex = tasks.findIndex(t => t.id === parseInt(editingId));
            if (taskIndex > -1) {
                tasks[taskIndex] = { ...tasks[taskIndex], name, course, deadline };
            }

            editTaskIdInput.value = '';
            submitBtn.textContent = 'Tambah Tugas';
            submitBtn.classList.remove('editing');
            
        } else {
            const newTask = {
                id: Date.now(),
                name: name,
                course: course,
                deadline: deadline,
                isCompleted: false
            };
            tasks.push(newTask);
        }
        
        saveTasks();
        renderTasks();
        taskForm.reset();
    };

    const handleTaskListClick = (e) => {
        const target = e.target;
        const taskItem = target.closest('.task-item');
        
        if (!taskItem || !taskItem.dataset.id) return;
        
        const taskId = parseInt(taskItem.dataset.id);

        if (target.classList.contains('toggle-complete')) {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.isCompleted = target.checked;
                saveTasks();
                renderTasks();
            }
        }
        
        if (target.classList.contains('delete-btn')) {
            if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
                tasks = tasks.filter(t => t.id !== taskId);
                saveTasks();
                renderTasks();
            }
        }
        
        if (target.classList.contains('edit-btn')) {
            const taskToEdit = tasks.find(t => t.id === taskId);
            if (taskToEdit) {
                taskNameInput.value = taskToEdit.name;
                courseNameInput.value = taskToEdit.course;
                taskDeadlineInput.value = taskToEdit.deadline;
                editTaskIdInput.value = taskToEdit.id;
                
                submitBtn.textContent = 'Update Tugas';
                submitBtn.classList.add('editing');
                
                taskForm.scrollIntoView({ behavior: 'smooth' });
                taskNameInput.focus();
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Tanpa Deadline';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    taskForm.addEventListener('submit', handleFormSubmit);
    taskList.addEventListener('click', handleTaskListClick);
    
    searchInput.addEventListener('input', renderTasks);
    filterStatusSelect.addEventListener('change', renderTasks);

    renderTasks();
});