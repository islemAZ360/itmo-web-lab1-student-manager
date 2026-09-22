// track current edit state
let currentEditingIsu = null;

// init page events
document.addEventListener("DOMContentLoaded", () => {
    renderTable();

    // open add form
    document.getElementById("show-add-form-btn").addEventListener("click", () => {
        openAddForm();
    });

    // cancel and hide form
    document.getElementById("cancel-form-btn").addEventListener("click", () => {
        closeForm();
    });

    // close dossier card
    document.getElementById("close-dossier-btn").addEventListener("click", () => {
        document.getElementById("student-dossier").style.display = "none";
    });

    // submit form
    document.getElementById("student-form").addEventListener("submit", handleFormSubmit);
});

// render table rows
function renderTable() {
    const tableBody = document.getElementById("student-body");
    tableBody.innerHTML = "";
    const students = getStudents();

    if (students.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">No students found</td></tr>`;
        return;
    }

    students.forEach(student => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${student.fullName}</td>
            <td>${student.group}</td>
            <td>${student.isuId}</td>
            <td>${student.room}</td>
            <td>
                <button onclick="viewStudent('${student.isuId}')">View</button>
                <button onclick="editStudent('${student.isuId}')">Edit</button>
                <button onclick="removeStudent('${student.isuId}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// show empty form
function openAddForm() {
    currentEditingIsu = null;
    document.getElementById("student-form").reset();
    document.getElementById("form-title").textContent = "Add Student";
    document.getElementById("isuId").readOnly = false;
    document.getElementById("student-form-section").style.display = "block";
    document.getElementById("student-dossier").style.display = "none";
}

// show form with current student data
function editStudent(isu) {
    const student = getStudentByIsu(isu);
    if (!student) return;

    currentEditingIsu = isu;
    document.getElementById("form-title").textContent = "Edit Student";

    // fill inputs
    document.getElementById("fullName").value = student.fullName;
    document.getElementById("group").value = student.group;
    document.getElementById("isuId").value = student.isuId;
    document.getElementById("isuId").readOnly = true; // lock isu
    document.getElementById("dormitoryNumber").value = student.dormitoryNumber;
    document.getElementById("room").value = student.room;
    document.getElementById("accommodationPeriod").value = student.accommodationPeriod;
    document.getElementById("isForeigner").checked = student.isForeigner;
    document.getElementById("notes").value = student.notes || "";

    document.getElementById("student-form-section").style.display = "block";
    document.getElementById("student-dossier").style.display = "none";
}

// reset and hide form
function closeForm() {
    document.getElementById("student-form").reset();
    document.getElementById("isuId").readOnly = false;
    currentEditingIsu = null;
    document.getElementById("student-form-section").style.display = "none";
}

// handle save (add or edit)
function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // browser popup validation
    if (!form.reportValidity()) {
        return;
    }

    const isuId = document.getElementById("isuId").value.trim();

    // check duplicate isu
    if (!currentEditingIsu && getStudentByIsu(isuId)) {
        alert("A student with this ISU ID already exists!");
        return;
    }

    const studentData = {
        fullName: document.getElementById("fullName").value.trim(),
        group: document.getElementById("group").value.trim(),
        isuId: isuId,
        dormitoryNumber: document.getElementById("dormitoryNumber").value,
        room: document.getElementById("room").value,
        accommodationPeriod: document.getElementById("accommodationPeriod").value,
        isForeigner: document.getElementById("isForeigner").checked,
        notes: document.getElementById("notes").value.trim()
    };

    if (currentEditingIsu) {
        updateStudent(currentEditingIsu, studentData);
    } else {
        addStudent(studentData);
    }

    closeForm();
    renderTable();
}

// show dossier info
function viewStudent(isu) {
    const student = getStudentByIsu(isu);
    if (!student) return;

    document.getElementById("dossier-name").textContent = student.fullName;
    document.getElementById("dossier-group").textContent = student.group;
    document.getElementById("dossier-isu").textContent = student.isuId;
    document.getElementById("dossier-dorm").textContent = student.dormitoryNumber;
    document.getElementById("dossier-room").textContent = student.room;
    document.getElementById("dossier-date").textContent = student.accommodationPeriod;
    document.getElementById("dossier-foreign").textContent = student.isForeigner ? "Yes" : "No";
    document.getElementById("dossier-notes").textContent = student.notes || "None";

    document.getElementById("student-dossier").style.display = "block";
    document.getElementById("student-form-section").style.display = "none";
}

// delete student
function removeStudent(isu) {
    if (confirm(`Are you sure you want to delete student with ISU ${isu}?`)) {
        deleteStudent(isu);
        document.getElementById("student-dossier").style.display = "none";
        renderTable();
    }
}