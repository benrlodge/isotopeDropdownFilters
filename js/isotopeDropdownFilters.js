(function() {
  var istopeDropdownFilters;

  $.fn.istopeDropdownFilters = function(pluginOptions) {
    return this.each(function(i, element) {
      return new istopeDropdownFilters($(element), pluginOptions);
    });
  };

  istopeDropdownFilters = (function() {
    istopeDropdownFilters.prototype.defaults = {
      container: '.item-container',
      filtersnav__filter: '.filtersnav__filter',
      filtersnav__dropdown: '.filtersnav__dropdown',
      filter__children: '.filtersnav__dropdown-items',
      filtersnav__item: '.filtersnav__dropdown-item',
      selected__label: '.selected-label'
    };

    function istopeDropdownFilters(element, options) {
      this.element = element;
      this.options = $.extend({}, this.defaults, options);
      this.allFilters = {};
      this.events();
    }

    istopeDropdownFilters.prototype.sizeDropdowns = function() {};

    istopeDropdownFilters.prototype.setFilters = function() {
      console.log('setting filters:');
      return console.log(this.activeFilters);
    };

    istopeDropdownFilters.prototype.filterChange = function(selection) {
      var $filter, $filters, $parentFilter, filter, isActive, item, _i, _j, _k, _l, _len, _len1, _len2, _len3;
      this.activeFilters = [];
      isActive = $(selection).hasClass('active');
      $filter = $(selection).data('filter');
      $parentFilter = $(selection).closest(this.options.filter__children);
      $filters = $parentFilter.find('.filtersnav__filter');
      if ($filter === 'all') {
        if (isActive) {
          $(selection).removeClass('active');
          for (_i = 0, _len = $filters.length; _i < _len; _i++) {
            item = $filters[_i];
            $(item).closest('.filtersnav__dropdown-item').find('input').prop('checked', false);
          }
          this.activeFilters = [];
        } else {
          $(selection).addClass('active');
          for (_j = 0, _len1 = $filters.length; _j < _len1; _j++) {
            item = $filters[_j];
            $(item).closest('.filtersnav__dropdown-item').find('input').prop('checked', true);
            if ($(item).data('filter') !== 'all') {
              this.activeFilters.push($(item).data('filter'));
            }
          }
        }
        this.setFilters();
        return;
      }
      for (_k = 0, _len2 = $filters.length; _k < _len2; _k++) {
        filter = $filters[_k];
        if ($(filter).attr('data-filter') === 'all' && $(filter).hasClass('active')) {
          $("[data-filter='all']").removeClass('active').prop('checked', false);
        }
      }
      if ($(selection).prop('checked')) {
        $(selection).addClass('active');
      } else {
        $(selection).removeClass('active');
      }
      for (_l = 0, _len3 = $filters.length; _l < _len3; _l++) {
        filter = $filters[_l];
        if ($(filter).hasClass('active')) {
          this.activeFilters.push($(filter).data('filter'));
        }
      }
      return this.setFilters();
    };

    istopeDropdownFilters.prototype.events = function() {
      var plugin;
      plugin = this;
      $(this.options.filtersnav__dropdown).on('mouseenter mouseleave', function() {
        return $(this).find(plugin.options.filter__children).toggle();
      });
      return $(this.options.filtersnav__filter).on('click', function() {
        return plugin.filterChange(this);
      });
    };

    return istopeDropdownFilters;

  })();

}).call(this);
