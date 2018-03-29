"use strict";

$(document).ready(function () {
    $("#moreGallery").on('click', function () {

        let elementsList = document.querySelectorAll(".gallery-list li a img");

        for (let i = 0; i < elementsList.length; i++) {

            if (elementsList[i].style.display == 'none') {
                elementsList[i].style.display = 'block';

                document.getElementById('moreGallery').style.display = 'none';

            }
        }

    })

});
