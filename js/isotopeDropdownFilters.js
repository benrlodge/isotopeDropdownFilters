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
      sizeDropdowns: true
    };

    function istopeDropdownFilters(element, options) {
      this.element = element;
      this.options = $.extend({}, this.defaults, options);
      this.allFilters = {};
      this.init();
      this.events();
    }

    istopeDropdownFilters.prototype.init = function() {
      $("[data-filter='all'").prop('checked', true);
      $(".filtersnav__filter").addClass('active');
      this.updateFilters();
      if (this.options.sizeDropdowns) {
        return this.sizeDropdowns();
      }
    };

    istopeDropdownFilters.prototype.sizeDropdowns = function() {};

    istopeDropdownFilters.prototype.setFilters = function() {
      var allGroups, allValues;
      allGroups = Object.keys(this.allFilters).map((function(_this) {
        return function(key) {
          return _this.allFilters[key];
        };
      })(this));
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
      $(this.options.container).isotope({
        filter: allValues.join(', ')
      });
      return this.cleanUpFilters();
    };

    istopeDropdownFilters.prototype.cleanUpFilters = function() {
      var child, children, count, parent, parents, _i, _j, _len, _len1, _results;
      parents = $('.filtersnav__dropdown');
      _results = [];
      for (_i = 0, _len = parents.length; _i < _len; _i++) {
        parent = parents[_i];
        count = 0;
        children = $(parent).find('.filtersnav__filter');
        for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
          child = children[_j];
          if ($(child).data('filter') !== 'all') {
            if ($(child).hasClass('active')) {
              count++;
            }
          }
        }
        if (count === 0) {
          _results.push($(parent).find("[data-filter='all']").addClass('active').prop('checked', true));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    istopeDropdownFilters.prototype.updateFilters = function() {
      var child, children, parent, parentName, parents, _i, _j, _len, _len1;
      parents = $('.filtersnav__dropdown');
      for (_i = 0, _len = parents.length; _i < _len; _i++) {
        parent = parents[_i];
        parentName = $(parent).data('filter-group');
        children = $(parent).find('.filtersnav__filter');
        this.allFilters[parentName] = [];
        for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
          child = children[_j];
          if ($(child).data('filter') !== 'all') {
            if ($(child).hasClass('active')) {
              this.allFilters[parentName].push($(child).data('filter'));
            }
          }
        }
      }
      return this.setFilters();
    };

    istopeDropdownFilters.prototype.filterChange = function(selection) {
      var $allFilter, $filter, $filters, $parentFilter, category, isActive, item, selectionStatus, _i, _len;
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
          $(selection).prop('checked', true);
          return;
        } else {
          for (_i = 0, _len = $filters.length; _i < _len; _i++) {
            item = $filters[_i];
            if ($(item).data('filter') !== 'all') {
              $(item).closest('.filtersnav__dropdown-item').find('input').prop('checked', false).addClass('active');
              this.activeFilters.push($(item).data('filter'));
            }
          }
          $(selection).addClass('active');
        }
        this.allFilters[category] = this.activeFilters;
        this.updateFilters();
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
      this.allFilters[category] = this.activeFilters;
      return this.updateFilters();
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
