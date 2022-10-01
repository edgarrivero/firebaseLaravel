import './bootstrap';
import { saveTask, getTask, onGetTasks, deleteTask } from './firebase';

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
                                      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        ...
                                      </button>
                                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item" href="#">Editar</a></li>
                                        <li><button type="button" class="dropdown-item btn-delete" data-id="${doc.id}"  >Eliminar</button></li>
                                      </ul>
                                    </div>

                                </td>
                            </tr>`;

            $("#tableBody").append(records);
        })
        const containerBtn = document.getElementById('tableBody');
        const btnsDelete = containerBtn.querySelectorAll('.btn-delete');

        btnsDelete.forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log(e.target.dataset.id);
                deleteTask(e.target.dataset.id);
            })
        })
    })

})

const taskForm = document.getElementById('task-form')

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const cantidad = taskForm['amount'];
    const fecha = taskForm['date'];
    const user = taskForm['name'];
    const typeCar = taskForm['typeCar'];
    saveTask(cantidad.value,fecha.value,typeCar.value,user.value);
})

const importExcel = document.getElementById('btn-import-excel');

var selectedFile;

var obj = null;
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


