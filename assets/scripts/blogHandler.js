var content = document.getElementById('blog');
var cFoot = document.getElementById('c-foot');
var newer = document.getElementById('newer');
var older = document.getElementById('older');

document.getElementById('newer').onclick = function () {
    document.getElementById('content').scrollIntoView();
    index++;

    update();
};

document.getElementById('older').onclick = function () {
    document.getElementById('content').scrollIntoView();
    index--;

    update();
};

newer.style.display = "none";
older.style.display = "none";
cFoot.style.display = "none";

var ref = window.location.href;
if (ref.indexOf('?') != -1) {
    ref = ref.substr(0, ref.indexOf('?'));
}

var blogsHtml = {};
var index = blogsFiles.length - 1;

var hIndex = parseSecond('i');
if (typeof hIndex != "undefined") {
    if (hIndex > -1 && hIndex < blogsFiles.length) {
        index = hIndex;
    }
}

for (var i = 0; i < blogsFiles.length; i++) {
    (function () {
        var location = blogsFiles[i];

        readTextFile('blogs/' + location, function (error, response) {
            if (error) {
                throw error;
            }

            blogsHtml[location] = response;
        });
    })();
}

update(true);
function update(sIndex) {
    if (index > 0 || index < blogsFiles.length - 1) {
        if (index > 0) {
            older.style.display = "block";
        } else {
            older.style.display = "none";
        }

        if (index < blogsFiles.length - 1) {
            newer.style.display = "block";
        } else {
            newer.style.display = "none";
        }

        cFoot.style.display = "block";
    } else {
        cFoot.style.display = "none";
    }

    content.innerHTML = blogsHtml[blogsFiles[index]];

    if (typeof sIndex == "undefined") {
        history.pushState(undefined, 'Senior Project', ref + '?i=' + index);
    }
}