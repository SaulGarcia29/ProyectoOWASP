ProjectOWASP.directive('file', function () {
    return {
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var file = event.target.files[0];

                let sizeMb = (file.size / 1024) / 1024;
                let maximunSize = 8;
                if (sizeMb > maximunSize) {
                    alert("El maximo tamaño de imagen permitido es de " + maximunSize + "mb");
                }
                else {
                    scope.file.file = file ? file : undefined;
                    if (scope.file != undefined && scope.file != null) {
                        scope.file.image.labelFile = file.name;
                        var base64 = URL.createObjectURL(file);
                        scope.file.image.imageContent = base64;
                    }
                    scope.$apply();
                }
            });
        }
    };
});