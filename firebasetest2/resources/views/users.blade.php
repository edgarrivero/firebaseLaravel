<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">

    <title>Hello, world!</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.3/xlsx.full.min.js"></script>

    @vite(['resources/js/app.js', 'resources/css/app.css'])
</head>
</head>
<body class="bg-gray-10">
    <div class="container">
        <div class="row p-4">
            <div class="col   m-3 ">
                <div class="bg-white p-4 rounded-3 shadow-sm">
                    <h4>Guardar Registro</h4>
                    <form id="task-form">
                        <div class="mb-3">
                            <label for="amount" class="form-label">Cantidad</label>
                            <input type="number" class="form-control" id="amount">
                        </div>
                        <div class="mb-3">
                            <label for="date" class="form-label">Fecha</label>
                            <input type="date" class="form-control" id="date">
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">Nombre del Solicitante</label>
                            <input type="text" class="form-control" id="name" aria-describedby="typeCar">
                        </div>
                        <div class="mb-3">
                            <label for="typeCar" class="form-label">Tipo de Vehiculo</label>
                            <input type="text" class="form-control" id="typeCar" aria-describedby="typeCar">
                        </div>

                        <button type="submit" class="btn btn-primary" id="submitUser2">Guardar</button>
                    </form>
                    <hr>
                    <h4>Subir Excel</h4>
                    <div class="panel panel-primary">
                        <div class="panel-heading">Guardar excel en base de datos</div>
                        <div class="panel-body">
                            <!-- Input type file to upload excel file -->
                            <div class="input-group">
                                <input type="file" class="form-control" id="fileUpload" accept=".xls,.xlsx"/><br/>
                                <button type="button" id="uploadExcel" class="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col bg-white p-4 m-3 rounded-3 shadow-sm">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Tipo Vehiculo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Fecha de compra</th>
                        <th scope="col">Acción</th>
                    </tr>
                    </thead>
                    <tbody id="tableBody">


                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>


    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    -->
</body>
</html>
