import { getStudentById, addStudent, updateStudent } from './service.js';
import { validateStudentData } from './validation.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const errorBox = document.getElementById('validationErrors');
    const pageTitle = document.getElementById('pageTitle');
    
    // URL থেকে ID রিড করা (Edit Mode চেক)
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('id');

    // REQUIREMENT: এডিট মোডে ডাটা অটোমেটিক প্রি-ফিল হবে
    if (editId) {
        pageTitle.textContent = 'Редактировать студента';
        const student = getStudentById(editId);
        
        if (student) {
            document.getElementById('fullName').value = student.fullName;
            document.getElementById('group').value = student.group;
            document.getElementById('isuId').value = student.isuId;
            document.getElementById('dormitoryNumber').value = student.dormitoryNumber;
            document.getElementById('room').value = student.room;
            document.getElementById('accommodationPeriod').value = student.accommodationPeriod;
            document.getElementById('isForeigner').checked = Boolean(student.isForeigner);
            document.getElementById('notes').value = student.notes || '';
        } else {
            alert('Студент не найден!');
            window.location.href = 'index.html';
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        errorBox.style.display = 'none';
        errorBox.textContent = '';

        // Form থেকে ডাটা নেওয়া
        const studentData = {
            fullName: document.getElementById('fullName').value,
            group: document.getElementById('group').value,
            isuId: document.getElementById('isuId').value,
            dormitoryNumber: document.getElementById('dormitoryNumber').value,
            room: document.getElementById('room').value,
            accommodationPeriod: document.getElementById('accommodationPeriod').value,
            isForeigner: document.getElementById('isForeigner').checked,
            notes: document.getElementById('notes').value
        };

        // JS Validation check
        const validation = validateStudentData(studentData);
        if (!validation.isValid) {
            errorBox.innerHTML = validation.errors.join('<br>');
            errorBox.style.display = 'block';
            return;
        }

        try {
            if (editId) {
                // Update
                updateStudent(editId, studentData);
            } else {
                // Create
                addStudent(studentData);
            }
            // সফল হলে লিস্ট পেজে ফিরে যাওয়া
            window.location.href = 'index.html';
        } catch (error) {
            // Cookies লিমিট বা কোনো এরর হ্যান্ডেল করা
            errorBox.textContent = error.message;
            errorBox.style.display = 'block';
        }
    });
});