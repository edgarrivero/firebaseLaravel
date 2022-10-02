import './bootstrap';
import { saveTask, getTask, onGetTasks, deleteTask,editTask, updateTask } from './firebase';

const taskForm = document.getElementById('task-form')
const importExcel = document.getElementById('btn-import-excel');
let selectedFile;
let obj = null;
let statusTask = false;
let idTask = '';
window.addEventListener('DOMContentLoaded', async() => {
    //const querySnapshot = await getTask();
    onGetTasks( (querySnapshot)=>{
        var i = 0;
        $("#tableBody").empty();
        querySnapshot.forEach(doc => {
            i++;
            let records = `<tr>
                                <th>${i} </th>
                                <td>${doc.data().nombreSolicitante} </td>
                                <td>${doc.data().tipoVehiculo}</td>
                                <td>${doc.data().cantidad}</td>
                                <td>${doc.data().created_at}</td>
                                <td>
                                    <div class="dropdown">
                                      <button class="btn dropdown-toggle border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                        </svg>
                                      </button>
                                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><button type="button" class="dropdown-item btn-edit" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" >Editar</button></li>
                                        <li><button type="button" class="dropdown-item btn-delete text-danger" data-id="${doc.id}"  >Eliminar</button></li>
                                      </ul>
                                    </div>

                                </td>
                            </tr>`;

            $("#tableBody").append(records);
        })
        const containerBtn = document.getElementById('tableBody');
        const btnsDelete = containerBtn.querySelectorAll('.btn-delete');
        const btnsEdits = containerBtn.querySelectorAll('.btn-edit');
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log(e.target.dataset.id);
                deleteTask(e.target.dataset.id);
            })
        })
        btnsEdits.forEach( (btn) => {
            btn.addEventListener('click', async (e) => {
                const doc = await editTask(e.target.dataset.id);
                console.log(doc.data());

                const task = doc.data();
                taskForm['amount'].value = task.cantidad;
                taskForm['date'].value = task.created_at;
                taskForm['name'].value = task.nombreSolicitante;
                taskForm['typeCar'].value = task.tipoVehiculo;

                statusTask = true;
                idTask = e.target.dataset.id;
            })
        })
    })

})

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    // $("#exampleModal").modal('hide');
    const cantidad = taskForm['amount'];
    const fecha = taskForm['date'];
    const user = taskForm['name'];
    const typeCar = taskForm['typeCar'];

    let docRef = null;
    let doc = null;
    if (statusTask){
        updateTask(idTask,{
            cantidad: cantidad.value,
            date: fecha.value,
            typeCar: typeCar.value,
            user: user.value
        } );
    }else {
        docRef = await saveTask(cantidad.value,fecha.value,typeCar.value,user.value);
        doc = await editTask(docRef["id"]);
        taskForm.reset();
    }

    $("#nameAlert").text(doc.data().nombreSolicitante);
    //$("#alertCreate").removeClass("d-none");
    const alertContainer = document.getElementById("alertCreate");
    alertContainer.classList.remove("d-none");


})


document
    .getElementById("fileUpload")
    .addEventListener("change", function (event) {
        selectedFile = event.target.files[0];
    });
document
    .getElementById("uploadExcel")
    .addEventListener("click", function () {

        if (selectedFile) {
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var data = event.target.result;

                var workbook = XLSX.read(data, {
                    type: "binary"
                });
                workbook.SheetNames.forEach(sheet => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(
                        workbook.Sheets[sheet]
                    );
                    let jsonObject = JSON.stringify(rowObject);
                    obj = JSON.parse(jsonObject);
                    obj.forEach(function (e, i) {
                        saveTask(e.Cantidad,e.FechaCompra,e.TipoVehiculo,e.Usuario);
                    })
                });
            };
            fileReader.readAsBinaryString(selectedFile);
        }
    });


