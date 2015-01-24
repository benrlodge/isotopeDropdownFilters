(function() {
  var istopeDropdownFilters;

  $.fn.istopeDropdownFilters = function(pluginOptions) {
    return this.each(function(i, element) {
      return new istopeDropdownFilters($(element), pluginOptions);
    });
  };

  istopeDropdownFilters = (function() {
    istopeDropdownFilters.prototype.defaults = {
      filtersnav__dropdown: '.filtersnav__dropdown',
      filter__children: '.filtersnav__dropdown-items',
      filtersnav__item: '.filtersnav__dropdown-item',
      selected__label: '.selected-label'
    };

    function istopeDropdownFilters(element, options) {
      var plugin;
      this.element = element;
      plugin = this;
      this.options = $.extend({}, plugin.defaults, options);
      console.log(this.options);
      this.events();
    }

    istopeDropdownFilters.prototype.sizeDropdowns = function() {
      return console.log('sizeDropdowns');
    };

    istopeDropdownFilters.prototype.filterChange = function(selection) {
      var label;
      label = $(selection).text();
      $(selection).find(this.options.filter__children).toggle();
      return $(selection).closest('.filtersnav__dropdown').find(this.options.selected__label).text(label);
    };

    istopeDropdownFilters.prototype.events = function() {
      var plugin;
      plugin = this;
      $(this.options.filtersnav__dropdown).on('mouseenter mouseleave', function() {
        return $(this).find(plugin.options.filter__children).toggle();
      });
      return $(this.options.filtersnav__item).on('click', function() {
        return plugin.filterChange(this);
      });
    };

    return istopeDropdownFilters;

  })();

}).call(this);
