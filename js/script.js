import { getStudents, deleteStudent, initDummyData } from './service.js';

document.addEventListener('DOMContentLoaded', () => {
    initDummyData();
    displayStudent();

    // Close Dossier Button
    document.getElementById('close-dossier-btn').addEventListener('click', () => {
        document.getElementById("student-dossier").style.display = "none";
    });
});

function displayStudent() {
    const tableBody = document.getElementById("student-body");
    tableBody.innerHTML = ''; 
    const studentsList = getStudents();

    if(studentsList.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No students found</td></tr>`;
        return;
    }

    studentsList.forEach(student => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${escapeHTML(student.fullName)}</td>
            <td>${escapeHTML(student.group)}</td>
            <td>${escapeHTML(student.isuId)}</td>
            <td>${escapeHTML(student.room)}</td>
            <td class="actions">
                <button class="btn btn-view" data-id="${student.id}">View</button>
                <a href="form.html?id=${student.id}" class="btn">Edit</a>
                <button class="btn btn-danger btn-delete" data-id="${student.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    // Attach events to buttons
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', (e) => viewStudent(e.target.dataset.id));
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(confirm("Are you sure you want to delete this student?")) {
                deleteStudent(e.target.dataset.id);
                displayStudent(); // Reload table reactively
            }
        });
    });
}

function viewStudent(id) {
    const studentsList = getStudents();
    const target = studentsList.find(s => s.id === id);
    
    if (target) {
        document.getElementById("dossier-name").textContent = target.fullName;
        document.getElementById("dossier-group").textContent = target.group;
        document.getElementById("dossier-isu").textContent = target.isuId;
        document.getElementById("dossier-dorm").textContent = target.dormitoryNumber || 'N/A';
        document.getElementById("dossier-room").textContent = target.room;
        document.getElementById("dossier-date").textContent = target.accommodationPeriod || 'N/A';
        document.getElementById("dossier-foreign").textContent = target.isForeigner ? 'Yes' : 'No';
        document.getElementById("dossier-notes").textContent = target.notes || 'None';
        
        document.getElementById("student-dossier").style.display = "block";
    }
}

// Security: Prevent XSS 
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}