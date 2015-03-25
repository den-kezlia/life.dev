$(document).ready(function() {
    App = {
        rows: 5,
        columns: 5,
        matrix: [],
        interval: 2000,

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
                var cell = $(this);
                cell.toggleClass('active');
                App.updateCellStatus(cell);
            });
        },

        initStartEvent: function() {
            $("#life-start").click(function() {
                App.startLife();
            });
        },

        updateCellStatus: function(cell) {
            App.matrix[ cell.data('row') ][ cell.data('column') ] = true;
        },

        startLife: function() {
            setInterval(function() {
                App.recalculate();
            }, App.interval);
        },

        recalculate: function() {
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
                App.matrix[row][column] = true;
                $(".life-cell[data-row='" + row + "'][data-column='" + column + "']").addClass("active");
            }

            console.log(lives);
        },

        checkIfToDie: function(row, column) {
            var lives = App.calculateHowManyLives(row, column);

            if (lives < 2 || lives > 3) {
                App.matrix[row][column] = false;
                $(".life-cell[data-row='" + row + "'][data-column='" + column + "']").removeClass("active");
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
        }
    };

    App.init();
});