var bish = new Vue({
    el: '#app',

    data: {
        colour: 'Bishment'
    },
    computed: {
        bgColour : function () {

            function hashCode(str) { // java String#hashCode
                var hash = 0;
                for (var i = 0; i < str.length; i++) {
                    hash = str.charCodeAt(i) + ((hash << 5) - hash);
                }
                return hash;
            }

            function intToRGB(i){
                var c = (i & 0x00FFFFFF)
                    .toString(16)
                    .toUpperCase();

                return "00000".substring(0, 6 - c.length) + c;
            }
            //console.log(intToRGB(hashCode(this.colour)));
            return intToRGB(hashCode(this.colour));

        },

        txtColour : function () {

            function invertColor(hex) {
                if (hex.indexOf('#') === 0) {
                    hex = hex.slice(1);
                }
                // convert 3-digit hex to 6-digits.
                if (hex.length === 3) {
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                }
                if (hex.length !== 6) {
                    throw new Error('Invalid HEX color.');
                }
                // invert color components
                var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
                    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
                    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
                // pad each with zeros and return
                return '#' + padZero(r) + padZero(g) + padZero(b);
            }

            function padZero(str, len) {
                len = len || 2;
                var zeros = new Array(len).join('0');
                return (zeros + str).slice(-len);
            }
            return invertColor(this.bgColour);
        }
    },
    methods : {
        resizeTextarea : function (e) {

            setTimeout(function(){
                e.target.style.height = 'auto';
                // for box-sizing other than "content-box" use:
                // el.style.cssText = '-moz-box-sizing:content-box';
                e.target.style.height = e.target.scrollHeight + 'px';
            },0);

        }
    }
});


// function textAreaAdjust(o) {
//     o.style.height = "1px";
//     o.style.height = (25+o.scrollHeight)+"px";
// }