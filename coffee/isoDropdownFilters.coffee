
$.fn.istopeDropdownFilters = (pluginOptions) ->
  @each (i, element) -> new istopeDropdownFilters($(element), pluginOptions)


class istopeDropdownFilters
  defaults:
    filtersnav__dropdown: '.filtersnav__dropdown'
    filter__children:'.filtersnav__dropdown-items'
    filtersnav__item: '.filtersnav__dropdown-item'
    selected__label: '.selected-label'

  constructor: (@element, options) ->
    plugin = @    
    @options = $.extend({}, plugin.defaults, options)
    console.log @options
    @events()

  sizeDropdowns: ->
    console.log 'sizeDropdowns'


  filterChange: (selection) ->
    label = $(selection).text()
    $(selection).find(@options.filter__children).toggle()
    $(selection).closest('.filtersnav__dropdown').find(@options.selected__label).text(label)


  events: ->  
    plugin = @

    $(@options.filtersnav__dropdown).on 'mouseenter mouseleave', ->
      $(this).find(plugin.options.filter__children).toggle()
      
    $(@options.filtersnav__item).on 'click', ->
      plugin.filterChange(@)
      




