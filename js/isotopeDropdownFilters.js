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
      this.element = element;
      this.options = $.extend({}, this.defaults, options);
      this.events();
    }

    istopeDropdownFilters.prototype.sizeDropdowns = function() {};

    istopeDropdownFilters.prototype.filterChange = function(selection) {
      var $container, filter, filterValue;
      $(selection).find(this.options.filter__children).toggle();
      $(selection).closest('.filtersnav__dropdown').find(this.options.selected__label).text($(selection).text());
      filter = $(selection).find('a').data('filter');
      if (filter === '*') {
        filterValue = '*';
      } else {
        filterValue = "." + filter;
      }
      $container = $(".item-container");
      return $container.isotope({
        filter: filterValue
      });
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
