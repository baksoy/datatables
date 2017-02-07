/**
 * Created by beraaksoy on 2/6/17.
 */
$(document).ready(function () {

    // 1) Basic Table
    // Uncomment the next line and comment everything else for a basic table pagination and search
    // $('#maintable').DataTable();

    // 2) Hide columns 3 and 4
    // Use when you want to show a different view
    // $('#maintable').dataTable({
    //     "columnDefs": [
    //         {
    //             "targets": [2],
    //             "visible": false,
    //             "searchable": false
    //         },
    //         {
    //             "targets": [3],
    //             "visible": false
    //         }
    //     ]
    // });


    // 3) Add the following buttons:
    // Copy all rows to clipboard, Export to Excel, Export to CSV, Printable View, and Export to Pdf
    var table = $('#maintable').DataTable({
        mark: true,
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'print',
            {
                extend: 'pdfHtml5',
                download: 'open'
            }
        ]
    });

    // 4) Toggle Column Visibility.
    $('button.toggle-vis').on('click', function (e) {
        e.preventDefault();
        var column = table.column($(this).attr('data-column'));
        column.visible(!column.visible());
    });


    // 5) Search on Multiple Columns
    $('#maintable tfoot th').each(function () {
        var title = $('#maintable tfoot th').eq($(this).index()).text();
        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });

    table.columns().eq(0).each(function (colIdx) {
        $('input', table.column(colIdx).footer()).on('keyup change', function () {
            table
                .column(colIdx)
                .search(this.value)
                .draw();
        });
    });

});
