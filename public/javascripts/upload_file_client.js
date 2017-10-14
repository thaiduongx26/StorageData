console.log("Hi :) I'm Duong !");
console.log("Contact : thaiduongx26@gmail.com");
var checkTableRow = 0;
$('.btn-choose-file-upload').on('click', () => {
	$('#choose-file-upload').click();
});

$('#choose-file-upload').on('change', () => {
	var files = document.getElementById('choose-file-upload').files;
	console.log(files.length);
	if (files.length > 0){
		var file = files[0];
		$('.btn-choose-file-upload').text('Upload More');
		$(".table-upload").css("display", "block");
		$('.table-run-after-choose-file tr:last').after(
			`<tr>
				<td><p class="name-file" style="font-weight: bold; font-size: 15px; overflow:hidden; text-overflow: ellipsis; width: 300px">${file.name}</p></td>
				<td>
					<div class="progress-bar progress-bar-${checkTableRow}" role="progressbar" style="border-radius: 5px; height: 20px">
					</div>
				</td>
				<td><p class="link-file-${checkTableRow}"">Uploading</p></td>
			</tr>`
		);
		var formData = new FormData();
		formData.append('upload[]', file, file.name);
		console.log(file.name);
		uploadFile(formData, checkTableRow);
		checkTableRow++;
	}
});

var uploadFile = (formData, numRow) => {
	$.ajax({
	    url: '/upload',
	    type: 'POST',
	    data: formData,
	    processData: false,
	    contentType: false,
	    success: (res) => {
	    	var result = JSON.parse(res, undefined, 2);
	    	if(result.code == 200){
	    		$(`.link-file-${numRow}`).text("");
	    		$(`.link-file-${numRow}`).append(`<a href="localhost:3000/${result.data}">localhost:3000/${result.data}</a>`);
	    		// $(`.link-file-${numRow}`).text("localhost:3000/" + result.data);
	    	}else{
				$(`.link-file-${numRow}`).text("failed");
	    	}
	    },
	    xhr: () => {
	        // create an XMLHttpRequest
	        var xhr = new XMLHttpRequest();
	        // listen to the 'progress' event
    		xhr.upload.addEventListener('progress', (evt) => {
	            if (evt.lengthComputable) {
		            // calculate the percentage of upload completed
		            var percentComplete = evt.loaded / evt.total;
		            percentComplete = parseInt(percentComplete * 100);

		            // update the Bootstrap progress bar with the new percent
		            $(`.progress-bar-${numRow}`).width(percentComplete + '%');
		            $(`.progress-bar-${numRow}`).text(percentComplete + '%');
		            // once the upload reaches 100%, set the progress bar text to done
		            if (percentComplete === 100) {
		              $(`.progress-bar-${numRow}`).html('Done');
		            }
        		}

    		}, false);
	    	return xhr;
		}
	});
}