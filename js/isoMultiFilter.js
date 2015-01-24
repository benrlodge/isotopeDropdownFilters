(function() {
  $.fn.isoMultiFilter = function(options) {
    var defaults, events, filterChange, filter__children, filtersnav__dropdown, filtersnav__item, init, viewDetails;
    defaults = {
      itemsContainer: $(".item-container"),
      navContainer: $('.filtersnav')
    };
    options = $.extend(defaults, options);
    filtersnav__dropdown = '.filtersnav__dropdown';
    filter__children = '.filtersnav__dropdown-items';
    filtersnav__item = '.filtersnav__dropdown-item';
    viewDetails = function() {
      return $("[data-filter-detail='selected']").text('Yo!');
    };
    filterChange = function() {
      console.log('filter changed');
      return viewDetails();
    };
    events = function() {
      $(filtersnav__dropdown).on('mouseenter mouseleave', function() {
        return $(this).find(filter__children).toggle();
      });
      return $(filtersnav__item).on('click', function(ev) {
        ev.preventDefault();
        $(this).find(filter__children).toggle();
        return filterChange();
      });
    };
    init = function() {
      console.log('init');
      return this.events();
    };
    return this.each(function() {
      console.log('oh fuck yea');
      return events();
    });
  };

}).call(this);
