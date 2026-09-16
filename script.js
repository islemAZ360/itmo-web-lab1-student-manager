function displayStudent() {

    const tableBody = document.getElementById("student-body");
    tableBody.innerHTML = '' ;

    let studentsList = getStudentsFromCookie();


    if (studentsList.length === 0){
        studentsList = [
        { fullName: "Islam Azaizia", group: "P3224", isuNumber: 470449, roomNumber: 2224 },
        { fullName: "bomba lakaka", group: "P3224", isuNumber: 654321, roomNumber: 505 }
    ];
    }


    const studentsAsText = JSON.stringify(studentsList);

    document.cookie = "students=" + studentsAsText;
 
    

    

    studentsList.forEach( student => {

    tableBody.innerHTML += `
        <tr>
            <td>${student.fullName}</td>
            <td>${student.group}</td>
            <td>${student.isuNumber}</td>
            <td>${student.roomNumber}</td>
            <td>
                <button onclick="viewStudent(${student.isuNumber})">View</button>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>
    `;
    });
}

function getStudentsFromCookie() {
    
    const allCookies = document.cookie;
    const cookiesArray = allCookies.split(";")

    for (let cookie of cookiesArray){
        let [name, valu] = cookie.trim().split("=");

        if (name === "students")
            return JSON.parse(valu);

    } return [];

}

function viewStudent(isu) {
    
    const studentsList = getStudentsFromCookie();

    
    const targetStudent = studentsList.find(student => student.isuNumber === isu);

    
    if (targetStudent) {
        document.getElementById("dossier-name").textContent = targetStudent.fullName;
        document.getElementById("dossier-group").textContent = targetStudent.group;
        document.getElementById("dossier-isu").textContent = targetStudent.isuNumber;
        document.getElementById("dossier-room").textContent = targetStudent.roomNumber;

        
        document.getElementById("student-dossier").style.display = "block";
    }
}

function closeDossier() {
    document.getElementById("student-dossier").style.display = "none";
}


displayStudent();
