window.addEventListener('load', function () {
    var lengthSlider = document.getElementById("size");
    var sliderValue = document.getElementById("sizeValue");
    sliderValue.innerHTML = lengthSlider.value;

    var lowerCaseList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var upperCaseList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var numsList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    var symbolsList = ["!", "#", "$", "%", "&", "(", ")", "+", "-", "/", ":", ";", "@", "[", "\\", "]", "^", "_", "|", "~"];

    lengthSlider.oninput = function () {
        sliderValue.innerHTML = this.value;
    };

    function generatePass() {
        var passLength = lengthSlider.value;
        var charPool = passPool();
        var passPositions = secureRandomMapper(passLength, charPool.length - 1);
        var generatedPass = [];
        for (var i = 0; i < passLength; i++)
            generatedPass.push(charPool[passPositions[i]]);
        document.getElementById("password").value = generatedPass.join('');
    }

    function passPool() {
        var poolArray = [];
        var up = document.getElementById("upper").checked;
        var low = document.getElementById("lower").checked;
        var num = document.getElementById("nums").checked;
        var sym = document.getElementById("symbols").checked;
        if (up)
            poolArray = poolArray.concat(upperCaseList);
        if (low)
            poolArray = poolArray.concat(lowerCaseList);
        if (num)
            poolArray = poolArray.concat(numsList);
        if (sym)
            poolArray = poolArray.concat(symbolsList);
        return poolArray;
    }

    function secureRandomMapper(passLength, max) {
        var randomArrayMapped = [];
        for (var i = 0; i < passLength; i++) {
            randomArrayMapped.push(getRandomInt(0, max));
        }
        return randomArrayMapped;
    }


    function getRandomInt(min, max) {
        var byteArray = new Uint8Array(1);
        window.crypto.getRandomValues(byteArray);
        var max_range = 256;
        var range = max - min + 1;
        var max_range = 256;
        if (byteArray[0] >= Math.floor(max_range / range) * range)
            return getRandomInt(min, max);
        return min + (byteArray[0] % range);
    }

    function copyPass() {
        var copyPass = document.getElementById("password");
        copyPass.select();
        document.execCommand("copy");
    }
    this.document.getElementById('copyButton').addEventListener('click',copyPass,false);
    this.document.getElementById('generateBtn').addEventListener('click',generatePass,false);

})