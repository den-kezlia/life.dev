$(document).ready(function() {
    App = {
        rows: 25,
        columns: 25,
        matrix: [],
        interval: 250,
        isStarted: false,

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
            var gameBlock = $('#game');

            for (var row = 0; row < App.rows; row++) {
                var line = $('<ul class="life-row" />');
                for (var column = 0; column < App.columns; column++) {
                    var cell = $('<li class="life-cell" data-row="' + row + '" data-column="' + column + '"><img src="img/cell.jpg" alt="cell"></li>');
                    line.append(cell);
                }

                layoutHtml.append(line);
            }

            var startButton = $('<div class="buttons-wrapper" id="buttons-wrapper"><button id="life-start" class="life-button">Start</button></div>');

            gameBlock.html('');
            gameBlock.prepend( layoutHtml );
            gameBlock.prepend( startButton );
        },

        initCellEvents: function() {
            $('.life-cell').click(function() {
                var cell = $(this);
                cell.toggleClass('active');
                App.updateCellStatus(cell);
            });
        },

        initStartEvent: function() {
            $('#life-start').on('click', function() {
                if (App.isStarted) {
                    App.stopLife();
                } else {
                    App.startLife();
                }
            });
        },

        updateCellStatus: function(cell) {
            if (App.matrix[ cell.data('row') ][ cell.data('column') ]) {
                App.matrix[ cell.data('row') ][ cell.data('column') ] = false;
            } else {
                App.matrix[ cell.data('row') ][ cell.data('column') ] = true;
            }
        },

        startLife: function() {
            App.isStarted = true;
            $('#life-start').text('Pause');

            App.initReset();

            App.timer = setInterval(function() {
                App.recalculate();
                App.rerenderLayout();
            }, App.interval);
        },

        stopLife: function() {
            App.isStarted = false;
            $('#life-start').text('Start');
            clearTimeout(App.timer);
        },

        initReset: function() {
            if ($('#life-reset').size() === 0) {
                $('#buttons-wrapper').append('<button id="life-reset" class="life-button">Reset</button>');

                $('#life-reset').on('click', function() {
                    App.isStarted = false;
                    clearTimeout(App.timer);
                    App.init();
                });
            }
        },

        recalculate: function() {
            App.regeneratedMatrix = [];
            for (var row = 0; row < App.rows; row++) {
                for (var column = 0; column < App.columns; column++) {
                    if (App.matrix[row][column]) {
                        App.checkIfToDie(row, column);
                    } else {
                        App.checkIfToGenerate(row, column);
                    }
                }
            }
        },

        checkIfToGenerate: function(row, column) {
            var lives = App.calculateHowManyLives(row, column);

            if (lives == 3) {
                App.regeneratedMatrix.push(row + ',' + column + ',true');
            }
        },

        checkIfToDie: function(row, column) {
            var lives = App.calculateHowManyLives(row, column);

            if (lives < 2 || lives > 3) {
                App.regeneratedMatrix.push(row + ',' + column + ',false');
            }
        },

        isCellExist: function(row, column){
            if ( (row != -1 && column != -1) && (row <= App.rows - 1 && column <= App.columns - 1) ) {
                return true;
            }
        },

        calculateHowManyLives: function(row, column) {
            var matrix = App.matrix;
            var lives = 0;

            if (App.isCellExist(row - 1, column - 1)) {
                if (matrix[row - 1][column - 1]) {
                    lives++;
                }
            }

            if (App.isCellExist(row - 1, column)) {
                if (matrix[row - 1][column]) {
                    lives++;
                }
            }

            if (App.isCellExist(row - 1, column + 1)) {
                if (matrix[row - 1][column + 1]) {
                    lives++;
                }
            }

            if (App.isCellExist(row, column - 1)) {
                if (matrix[row][column - 1]) {
                    lives++;
                }
            }

            if (App.isCellExist(row, column + 1)) {
                if (matrix[row][column + 1]) {
                    lives++;
                }
            }

            if (App.isCellExist(row + 1, column - 1)) {
                if (matrix[row + 1][column - 1]) {
                    lives++;
                }
            }

            if (App.isCellExist(row + 1, column)) {
                if (matrix[row + 1][column]) {
                    lives++;
                }
            }

            if (App.isCellExist(row + 1, column + 1)) {
                if (matrix[row + 1][column + 1]) {
                    lives++;
                }
            }

            return lives;
        },

        rerenderLayout: function(){
            for (var iterator = 0; iterator < App.regeneratedMatrix.length; iterator++) {
                var cell = App.regeneratedMatrix[iterator].split(",");

                if (cell[2] == "true") {
                    App.matrix[cell[0]][cell[1]] = true;
                    $(".life-cell[data-row='" + cell[0] + "'][data-column='" + cell[1] + "']").addClass("active");
                } else {
                    App.matrix[cell[0]][cell[1]] = false;
                    $(".life-cell[data-row='" + cell[0] + "'][data-column='" + cell[1] + "']").removeClass("active");
                }
            }
        }
    };

    App.init();
});