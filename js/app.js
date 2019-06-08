$(document).ready(function() {
	$.getJSON(
		"https://randomuser.me/api/", //API URL//

		{
			results: 12, // AMOUNT OF EMPLOYEES
			nat: ["us"] // NATIONALITY
		},

		function displayEmployees(data) {
			var EmployeeHTML = "";

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

				//BUILD THE MODAL
				EmployeeHTML += '<div id="employeeModal" class="modal">';
				EmployeeHTML += '<div class="modal-content">' + "<p>";
				//BUILD HTML TO DISPLAY PICTURES IN PAGE//
				EmployeeHTML +=
					'<img class="profile-pic" src="' +
					employee.picture.large +
					'">' +
					"<br>"; //BUILD HTML TO DISPLAY FULL NAME IN PAGE//
				EmployeeHTML +=
					'<span class="employee-name-modal"><b>Name:</b> ' +
					employee.name.first +
					" " +
					employee.name.last +
					"</span>" +
					"<br>";

				//BUILD HTML TO DISPLAY USERNAMES IN PAGE//
				EmployeeHTML +=
					'<span class="employee-username-modal"><b>Username:</b> ' +
					employee.login.username +
					"<br>" +
					"</span>";
				//BUILD HTML TO DISPLAY EMAILS IN PAGE//
				EmployeeHTML +=
					'<span class="employee-email-modal"><b>E-mail:</b> ' +
					employee.email +
					"<br>" +
					"</span>";

				//BUILD HTML TO DISPLAY CELLPHONES IN PAGE//
				EmployeeHTML +=
					'<span class="employee-cellphone-modal"><b>Phone:</b> +' +
					employee.cell +
					"<br>" +
					"</span>";

				//BUILD HTML TO DISPLAY DETAILED ADDRESS IN PAGE//
				EmployeeHTML +=
					'<span class="employee-address-modal"><b>Address:</b> ' +
					employee.location.street +
					"<br>" +
					employee.location.city +
					" " +
					employee.location.state +
					" " +
					employee.location.postcode +
					"<br>" +
					"</span>";

				//BUILD HTML TO DISPLAY DOB IN PAGE//
				EmployeeHTML +=
					'<span class="employee-dob-modal"><b>Birthday:</b> ' +
					employee.dob +
					"<br>" +
					"</span>";

				EmployeeHTML += "</p></div></div></div></div>";
				$(".detailsButton").click(e =>
					$("#employeeModal").dialog({
						hide: { effect: "fade", duration: 1000 },
						show: { effect: "fade", duration: 500 }
					})
				);

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

			// Get the modal
		}
	); //GET JSON DATA END
});
