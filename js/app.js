$(document).ready(function() {
    App = {
        rows: 10,
        columns: 10,

        init: function() {
            this.initLayout();
        },

        initLayout: function() {
            var layoutHtml = $('<div class="life-wrapper" id="lifeMatrix" />');

            for (var row = 1; row <= App.rows; row++) {
                var line = $('<ul class="life-row" />');
                for (var column = 1; column <= App.columns; column++) {
                    var cell = $('<li class="life-cell">' + row + '-' + column + '</li>');
                    line.append(cell);
                }

                layoutHtml.append(line);
            }

            $('body').append( layoutHtml );
        }
    };

    App.init();
});