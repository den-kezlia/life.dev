$(document).ready(function() {
    App = {
        rows: 10,
        columns: 10,
        matrix: [],
        isMatrixHold: false,

        init: function() {
            this.initMatrix();
            this.initLayout();
            this.initCellEvents();
            this.initStartEvent();
        },

        initMatrix: function() {
            for (var row = 0; row < App.rows; row++) {
                App.matrix[row] = [];
                for (var column = 0; column < App.columns; column++) {
                    App.matrix[row][column] = false;
                }
            }
        },

        initLayout: function() {
            var layoutHtml = $('<div class="life-wrapper" id="lifeMatrix" />');

            for (var row = 0; row < App.rows; row++) {
                var line = $('<ul class="life-row" />');
                for (var column = 0; column < App.columns; column++) {
                    var cell = $('<li class="life-cell" data-row="' + row + '" data-column="' + column + '">' + row + '-' + column + '</li>');
                    line.append(cell);
                }

                layoutHtml.append(line);
            }

            var startButton = $('<button id="life-start" class="life-start">Start</button>');
            layoutHtml.append(startButton);

            $('body').append( layoutHtml );
        },

        initCellEvents: function() {
            $('.life-cell').click(function() {
                if ( !App.isMatrixHold ) {
                    var cell = $(this);
                    cell.toggleClass('active');
                    App.updateCellStatus(cell);
                }
            });
        },

        initStartEvent: function() {
            $("#life-start").click(function() {
                App.isMatrixHold = true;
            });
        },

        updateCellStatus: function(cell) {
            App.matrix[ cell.data('row') ][ cell.data('column') ] = true;
        }
    };

    App.init();
});