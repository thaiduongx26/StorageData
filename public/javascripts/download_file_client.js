console.log("Hi :) I'm Duong !");
console.log("Contact : thaiduongx26@gmail.com");

$(document).ready(() => {
	$('.btn-download').click(() => {
		var fid = $('.get-file-id').text();
		var fname = $('.get-file-name').text();
		var a = document.createElement('a');
		var url = `http://localhost:3000/download/${fid}/${fname}`
        a.href = url;
        a.download = fname;
        a.click();
        window.URL.revokeObjectURL(url);
        $('.thanks-download').text('Thanks for download !')
	})
})

