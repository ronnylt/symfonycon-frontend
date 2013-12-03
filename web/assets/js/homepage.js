/**
 * Application for the homepage editing functionality
 */
(function($, window, undefined){

    var app = function($eventsWrapper) {
        this.$wrapper = $eventsWrapper;

        this.initialize();
    };

    $.extend(app.prototype, {
        initialize: function() {
            this.$wrapper.on('click', '.js-event-edit-link', $.proxy(this._handleEditClick, this));
            this.$wrapper.on('submit', '.js-event-edit-form', $.proxy(this._handleEditFormSubmit, this));
        },

        _handleEditClick: function(e) {
            e.preventDefault();

            var $anchor = $(e.currentTarget);
            var $event = $anchor.closest('.js-event-wrapper');
            $.ajax({
                // cute little hack to get the JSON version
                url: $anchor.attr('href')+'.json',
                success: function(data) {
                    $event.html(data.form);

                    $event.addClass('editing');
                }
            });
        },

        _handleEditFormSubmit: function(e) {
            e.preventDefault();
            var $form = $(e.currentTarget);
            var $event = $form.closest('.js-event-wrapper');

            $.ajax({
                // cute little hack to get the JSON version
                url: $form.attr('action')+'.json',
                type: 'POST',
                data: $form.serialize(),
                success: function(data) {
                    if (data.success) {
                        $event.html(data.event_html);
                    } else {
                        $event.html(data.form);
                    }
                    $event.removeClass('editing');
                }
            });
        }
    });

    window.HomepageApp = app;

})(jQuery, window);