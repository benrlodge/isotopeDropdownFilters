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
      var all, allF, allGroups, allValues;
      console.log(this.allFilters);
      allF = this.allFilters;
      allGroups = Object.keys(allF).map(function(key) {
        return allF[key];
      });
      allValues = [];
      allGroups.forEach(function(group, i) {
        var otherValues;
        otherValues = Array.prototype.concat.apply([], allGroups.slice(i + 1));
        return group.forEach(function(v1) {
          return otherValues.forEach(function(v2) {
            return allValues.push(v1 + v2);
          });
        });
      });
      all = allValues.join(', ');
      console.log(all);
      return $(this.options.container).isotope({
        filter: all
      });
    };

    istopeDropdownFilters.prototype.filterChange = function(selection) {
      var $allFilter, $filter, $filters, $parentFilter, category, filter, isActive, item, selectionStatus, _i, _j, _k, _len, _len1, _len2;
      selectionStatus = $(selection).is(':checked');
      this.activeFilters = [];
      isActive = $(selection).hasClass('active');
      $filter = $(selection).data('filter');
      $parentFilter = $(selection).closest(this.options.filter__children);
      $allFilter = $parentFilter.find("[data-filter='all']");
      $filters = $parentFilter.find('.filtersnav__filter');
      category = $(selection).closest('.filtersnav__dropdown').data('filter-group');
      if ($filter === 'all') {
        if (isActive) {
          $(selection).removeClass('active');
          for (_i = 0, _len = $filters.length; _i < _len; _i++) {
            item = $filters[_i];
            $(item).closest('.filtersnav__dropdown-item').find('input').prop('checked', false).removeClass('active');
          }
          this.activeFilters = [];
        } else {
          for (_j = 0, _len1 = $filters.length; _j < _len1; _j++) {
            item = $filters[_j];
            if ($(item).data('filter') !== 'all') {
              $(item).closest('.filtersnav__dropdown-item').find('input').prop('checked', false).addClass('active');
              this.activeFilters.push($(item).data('filter'));
            }
          }
          $(selection).addClass('active');
        }
        this.allFilters[category] = this.activeFilters;
        this.setFilters();
        return;
      }
      if ($allFilter.hasClass('active')) {
        $filters.removeClass('active').prop('checked', false);
        $(selection).addClass('active').prop('checked', true);
      } else {
        if (selectionStatus) {
          $(selection).addClass('active');
        } else {
          $(selection).removeClass('active');
        }
      }
      for (_k = 0, _len2 = $filters.length; _k < _len2; _k++) {
        filter = $filters[_k];
        if ($(filter).hasClass('active')) {
          this.activeFilters.push($(filter).data('filter'));
        }
      }
      this.allFilters[category] = this.activeFilters;
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
