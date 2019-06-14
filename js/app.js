$(document).ready(function() {
	var EmployeeHTML = "";
	var modalButton = "";
	$.getJSON(
		"https://randomuser.me/api/", //API URL//

		{
			results: 12, // AMOUNT OF EMPLOYEES
			nat: ["us"] // NATIONALITY
		},

		function displayEmployees(data) {
			$.each(data.results, function(i, employee) {
				//BUILD HTML TO DISPLAY PHOTOS IN PAGE//
				EmployeeHTML +=
					'<div class="employee-details detailsButton" > <img src="' +
					employee.picture.large +
					'" class="image ">';
				EmployeeHTML +=
					'<ul><li class="employee-name">' +
					employee.name.first +
					" " +
					employee.name.last +
					"</li>";
				EmployeeHTML +=
					'<li class="employee-email">' + employee.email + "</li>";
				EmployeeHTML +=
					'<li class="employee-location">' + employee.location.city + "</li>";
				// EmployeeHTML += '<button class="detailsButton">More Details </button>';
				EmployeeHTML += "</ul></div>";

				$("#employees").html(EmployeeHTML);

				// SEARCH FOR EMPLOYEE
				$("#search").on("keyup", function() {
					var value = $(this)
						.val()
						.toLowerCase();
					$("#employees .employee-details").filter(function() {
						$(this).toggle(
							$(this)
								.text()
								.toLowerCase()
								.indexOf(value) > -1
						);
					});
				});
			});
			// MODAL BUTTON
			$(".detailsButton").each(function(index) {
				$(this).on("click", function() {
					displayModal(data.results[index]);
				});
			});
		}
	); //GET JSON DATA END
	// CREATE MODAL
	function displayModal(employee) {
		var ModalHTML = "";
		//BUILD THE MODAL
		ModalHTML += '<div id="employeeModal" class="modal">';
		ModalHTML +=
			'<div class="modal-content"> <span id="close-btn"><i class="fa fa-times"></i></span>';
		//BUILD HTML TO DISPLAY PICTURES IN PAGE//
		ModalHTML +=
			'<img class="profile-pic" src="' + employee.picture.large + '">' + "<br>"; //BUILD HTML TO DISPLAY FULL NAME IN PAGE//
		ModalHTML +=
			'<ul><li class="employee-name">' +
			employee.name.first +
			" " +
			employee.name.last +
			"</li>";
		ModalHTML += '<li class="employee-email">' + employee.email + "</li>";
		ModalHTML +=
			'<li class="employee-location">' +
			employee.location.city +
			'</li><span class="bottom-divider"></span>';
		ModalHTML += '<li class="employee-email">' + employee.phone + "</li>";
		ModalHTML +=
			'<li class="employee-email">' + employee.location.street + "</li>";
		ModalHTML +=
			'<li class="employee-email"> Birthday:' + employee.dob.date + "</li>";
		ModalHTML +=
			'<span class="slide-modal"><i class="fa fa-arrow-circle-left"></i><i class="fa fa-arrow-circle-right"></i></span>';

		ModalHTML += "</ul></div></div>";

		$("#dialog-message").html(ModalHTML);
		$("#employeeModal").show();

		// CLOSE BUTTON
		$("#close-btn").on("click", function() {
			$("#employeeModal").hide();
		});
		// NAVIGATE EMPLOYEES
		var modalSlides = "";
		$(".fa-arrow-circle-right").click(function() {
			modalSlides = $(".modal");
			modalSlides.next().show();
		});
		$(".fa-arrow-circle-left").click(function() {
			modalSlides = $(".modal");
			modalSlides.preview().show();
		});
	} // END CREATE MODAL
});
