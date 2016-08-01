$(function () {


    $.getJSON('Inventory/GetProjectData', function (data) {
        if (PublishProjectTable(data)) {
            $('#ProjectTable').DataTable({
                "order": [[0, "asc"]],
                "pagingType": "full_numbers"
            });
        }
    });
    $.getJSON('Inventory/GetGroupData', function (data) {
        if (PublishGroupTable(data)) {
            $('#GroupTable').DataTable({
                "order": [[0, "asc"]],
                "pagingType": "full_numbers"
            });
        }
    });
    $.getJSON('Inventory/GetHostData', function (data) {
        if (PublishHostTable(data)) {
            $('#HostTable').DataTable({
                "order": [[0, "asc"]],
                "pagingType": "full_numbers"
            });
        }
    });

    $('#ProjectEditModal').on('show.bs.modal', function (event) { // id of the modal with event
        var button = $(event.relatedTarget) // Button that triggered the modal
        _row = $(button).parents("tr");
        var cols = _row.children("td");
        var title = 'Edit Project ' + $(cols[1]).text();

        // Update the modal's content.
        var modal = $(this)
        modal.find('.modal-title').text(title)
        modal.find('.modal-body input:radio[name=isenabled]').removeAttr('checked');
        // And if you wish to pass the productid to modal's 'Yes' button for further processing
        modal.find('.modal-body #projectid').val($(cols[0]).text());
        modal.find('.modal-body #projectname').val($(cols[1]).text());
        modal.find('.modal-body #projectdescription').val($(cols[2]).text());
        modal.find('.modal-body input:radio[name=isenabled]').filter('[value='+ $(cols[3]).text() +']').prop('checked', true);
    })


    $('#GroupEditModal').on('show.bs.modal', function (event) { // id of the modal with event
        var button = $(event.relatedTarget) // Button that triggered the modal
        _row = $(button).parents("tr");
        var cols = _row.children("td");
        var title = 'Edit Group ' + $(cols[2]).text();

        // Update the modal's content.
        var modal = $(this)
        modal.find('.modal-title').text(title)

        // And if you wish to pass the productid to modal's 'Yes' button for further processing
        modal.find('.modal-body #groupid').val($(cols[0]).text());
        modal.find('.modal-body #projectname').val($(cols[1]).text());
        modal.find('.modal-body #groupname').val($(cols[2]).text());
        modal.find('.modal-body #groupvariables').val($(cols[3]).text());
        modal.find('.modal-body input:radio[name=isenabled]').filter('[value=' + $(cols[4]).text() + ']').prop('checked', true);
    })


    $('#HostEditModal').on('show.bs.modal', function (event) { // id of the modal with event
        var button = $(event.relatedTarget) // Button that triggered the modal
        _row = $(button).parents("tr");
        var cols = _row.children("td");
        var title = 'Edit Host ' + $(cols[4]).text();

        // Update the modal's content.
        var modal = $(this)
        modal.find('.modal-title').text(title)

        // And if you wish to pass the productid to modal's 'Yes' button for further processing
        modal.find('.modal-body #hostid').val($(cols[0]).text());
        modal.find('.modal-body #environment').val($(cols[1]).text());
        modal.find('.modal-body #projectname').val($(cols[2]).text());
        modal.find('.modal-body #groupname').val($(cols[3]).text());
        modal.find('.modal-body #hostname').val($(cols[4]).text());
        modal.find('.modal-body #ipaddress').val($(cols[5]).text());
        modal.find('.modal-body #hostvariables').val($(cols[6]).text());
        modal.find('.modal-body input:radio[name=isenabled]').filter('[value=' + $(cols[7]).text() + ']').prop('checked', true);
    })

});

var PublishProjectTable = function (data) {
    var sorteddata = _.sortBy(data, 'project_id');
    var $tablehead = "<table id='ProjectTable' class='display' cellspacing='0' width='100%'>" +
               "<thead>" +
               "<tr>" +
               "<th style='text-align:center'>Project ID</th>" +
               "<th style='text-align:center'>Project Name</th>" +
               "<th style='text-align:center'>Project Description</th>" +
               "<th style='text-align:center'>Is Enabled</th>" +
               "<th style='text-align:center'>Actions</th>" +
               "</tr>" +
               "</thead>";
    var $tbody = '';
    $.each(sorteddata, function (key, value) {
        $tbody += '<tr><td align="center">' + value['project_id'] + '</td><td align="center">' + value['project_name'] + '</td><td align="justify">' + value['project_description'] + '</td><td align="center">' + value['is_enabled'] + '</td><td align="center" width="5px"><button type="button" data-toggle="modal" data-target="#ProjectEditModal" class="btn btn-xs project-edit"><span class="glyphicon glyphicon-pencil"></span></button></td></tr>';
    });
    $tbody += '</tbody>';
    $tableContent = $tablehead + $tbody + "</table>";
    $('#ProjectTableContainer').html($tableContent);
    return true;
}

var PublishGroupTable = function (data) {
    var sorteddata = _.sortBy(data, 'group_id');
    var $tablehead = "<table id='GroupTable' class='display' cellspacing='0' width='100%'>" +
               "<thead>" +
               "<tr>" +
               "<th style='text-align:center'>Group ID</th>" +
               "<th style='text-align:center'>Project Name</th>" +
               "<th style='text-align:center'>Group Name</th>" +
               "<th style='text-align:center'>Group Variables</th>" +
               "<th style='text-align:center'>Is Enabled</th>" +
               "<th style='text-align:center'>Actions</th>" +
               "</tr>" +
               "</thead>";
    var $tbody = '';
    $.each(sorteddata, function (key, value) {
        $tbody += '<tr><td align="center">' + value['group_id'] + '</td><td align="center">' + value['project_name'] + '</td><td align="center">' + value['group_name'] + '</td><td align="center">'+value['group_variables']+'</td><td align="center">' + value['is_enabled'] + '</td><td align="center" width="5px"><button type="button" data-toggle="modal" data-target="#GroupEditModal" class="btn btn-xs group-edit"><span class="glyphicon glyphicon-pencil"></span></button></td></tr>';
    });
    $tbody += '</tbody>';
    $tableContent = $tablehead + $tbody + "</table>";
    $('#GroupTableContainer').html($tableContent);
    return true;
}

var PublishHostTable = function (data) {
    console.log(data);
    var sorteddata = _.sortBy(data, 'host_id');
    var $tablehead = "<table id='HostTable' class='display' cellspacing='0' width='100%'>" +
               "<thead>" +
               "<tr>" +
               "<th style='text-align:center'>Host ID</th>" +
               "<th style='text-align:center'>Environment</th>" +
               "<th style='text-align:center'>Project Name</th>" +
               "<th style='text-align:center'>Group Name</th>" +            
               "<th style='text-align:center'>Host Name</th>" +
               "<th style='text-align:center'>IP Address</th>" +
               "<th style='text-align:center'>Host Variables</th>" +
               "<th style='text-align:center'>Is Enabled</th>" +
               "<th style='text-align:center'>Actions</th>" +
               "</tr>" +
               "</thead>";
    var $tbody = '';
    $.each(sorteddata, function (key, value) {
        $tbody += '<tr><td align="center">' + value['host_id'] + '</td><td align="center">' + value['env_name'] + '</td><td align="center">' + value['project_name'] + '</td><td align="center">' + value['group_name'] + '</td><td align="center">' + value['host_name'] + '</td><td align="center">' + value['ip_address'] + '</td><td align="center">' + value['host_variables'] + '</td><td align="center">' + value['is_enabled'] + '</td><td align="center" width="5px"><button type="button" data-toggle="modal" data-target="#HostEditModal" class="btn btn-xs host-edit"><span class="glyphicon glyphicon-pencil"></span></button></td></tr>';
    });
    $tbody += '</tbody>';
    $tableContent = $tablehead + $tbody + "</table>";
    $('#HostTableContainer').html($tableContent);
    return true;
}
    