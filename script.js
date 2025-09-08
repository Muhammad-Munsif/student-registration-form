const registrationForm = document.getElementById("registrationForm");
const studentTableContainer = document.getElementById("studentTableContainer");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const editModal = new bootstrap.Modal(document.getElementById("editModal"));

function getStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

function loadStudents() {
  const students = getStudents();
  if (students.length === 0) {
    studentTableContainer.innerHTML =
      '<div class="alert alert-warning text-center">No students registered yet.</div>';
    deleteAllBtn.style.display = "none";
    return;
  }

  deleteAllBtn.style.display = "inline-block";

  let tableHTML = `
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
    `;

  students.forEach((s, index) => {
    tableHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${s.fullName}</td>
          <td>${s.email}</td>
          <td>${s.dob}</td>
          <td>${s.gender}</td>
          <td>${s.grade}</td>
          <td>
            <button class="btn btn-sm btn-primary me-1" onclick="editStudent(${index})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteStudent(${index})">Delete</button>
          </td>
        </tr>
      `;
  });

  tableHTML += `</tbody></table></div>`;
  studentTableContainer.innerHTML = tableHTML;
}

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newStudent = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    grade: document.getElementById("grade").value,
  };
  const students = getStudents();
  students.push(newStudent);
  saveStudents(students);
  registrationForm.reset();
  loadStudents();
});

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    const students = getStudents();
    students.splice(index, 1);
    saveStudents(students);
    loadStudents();
  }
}

deleteAllBtn.addEventListener("click", () => {
  if (confirm("This will delete ALL students. Are you sure?")) {
    localStorage.removeItem("students");
    loadStudents();
  }
});

function editStudent(index) {
  const student = getStudents()[index];
  document.getElementById("editIndex").value = index;
  document.getElementById("editFullName").value = student.fullName;
  document.getElementById("editEmail").value = student.email;
  document.getElementById("editDob").value = student.dob;
  document.getElementById("editGender").value = student.gender;
  document.getElementById("editGrade").value = student.grade;
  editModal.show();
}

document.getElementById("editForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const index = document.getElementById("editIndex").value;
  const students = getStudents();
  students[index] = {
    fullName: document.getElementById("editFullName").value,
    email: document.getElementById("editEmail").value,
    dob: document.getElementById("editDob").value,
    gender: document.getElementById("editGender").value,
    grade: document.getElementById("editGrade").value,
  };
  saveStudents(students);
  editModal.hide();
  loadStudents();
});

loadStudents();
