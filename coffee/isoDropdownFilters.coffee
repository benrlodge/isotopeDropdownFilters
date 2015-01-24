
$.fn.istopeDropdownFilters = (pluginOptions) ->
  @each (i, element) -> new istopeDropdownFilters($(element), pluginOptions)


class istopeDropdownFilters
  defaults:
    filtersnav__dropdown: '.filtersnav__dropdown'
    filter__children:'.filtersnav__dropdown-items'
    filtersnav__item: '.filtersnav__dropdown-item'
    selected__label: '.selected-label'

  constructor: (@element, options) ->
    @options = $.extend({}, @defaults, options)
    @events()


  ## Size dropdown containers to be the same width as the top level button
  sizeDropdowns: ->


  ## Set active label and filter
  filterChange: (selection) ->
    
    $(selection).find(@options.filter__children).toggle()
    $(selection).closest('.filtersnav__dropdown')
                .find(@options.selected__label).text($(selection).text())


    filter = $(selection).find('a').data('filter')
    if filter is '*' then filterValue = '*' else filterValue = ".#{filter}"

    $container = $(".item-container")

    # $container.isotope filter: filterValue
    $container.isotope({ filter: filterValue })





  events: ->  
    plugin = @

    $(@options.filtersnav__dropdown).on 'mouseenter mouseleave', ->
      $(this).find(plugin.options.filter__children).toggle()
      
    $(@options.filtersnav__item).on 'click', ->
      plugin.filterChange(@)
      







