
$.fn.istopeDropdownFilters = (pluginOptions) ->
  @each (i, element) -> new istopeDropdownFilters($(element), pluginOptions)


class istopeDropdownFilters
  defaults:
    container: '.item-container'
    filtersnav__filter: '.filtersnav__filter'
    filtersnav__dropdown: '.filtersnav__dropdown'
    filter__children:'.filtersnav__dropdown-items'
    filtersnav__item: '.filtersnav__dropdown-item'
    selected__label: '.selected-label'

  constructor: (@element, options) ->
    @options = $.extend({}, @defaults, options)
    @allFilters = {}
    @events()


  ## Size dropdown containers to be the same width as the top level button
  sizeDropdowns: ->



  setFilters: ->
    console.log @allFilters
    allF = @allFilters

    allGroups = Object.keys(allF).map (key) -> allF[key]
    # allGroups = for cat, values of @allFilters
    #    values

    allValues = []
    allGroups.forEach (group, i) ->
        otherValues = Array.prototype.concat.apply [], allGroups.slice(i + 1)
        group.forEach (v1) -> otherValues.forEach (v2) -> allValues.push(v1 + v2)

    
    all = allValues.join(', ')
    console.log all

    $(@options.container).isotope({ filter: all })






  ## Set active label and filter
  filterChange: (selection) ->

    selectionStatus = $(selection).is(':checked')
    @activeFilters = []
    isActive = $(selection).hasClass('active')
    $filter = $(selection).data('filter')
    $parentFilter = $(selection).closest(@options.filter__children)
    $allFilter = $parentFilter.find("[data-filter='all']")
    $filters = $parentFilter.find('.filtersnav__filter')
    category = $(selection).closest('.filtersnav__dropdown').data('filter-group')

    if $filter is 'all'

      if isActive
        $(selection).removeClass('active')
        for item in $filters
          $(item).closest('.filtersnav__dropdown-item').find('input').prop('checked', false).removeClass('active')
        @activeFilters = []

      else
        for item in $filters
          if $(item).data('filter') isnt 'all'
            $(item).closest('.filtersnav__dropdown-item').find('input').prop('checked', false).addClass('active')
            @activeFilters.push $(item).data('filter')
        $(selection).addClass('active')

      @allFilters[category] = @activeFilters
      @setFilters()
      return
      
    if $allFilter.hasClass('active')
      $filters.removeClass('active').prop('checked', false)      
      $(selection).addClass('active').prop('checked', true)

    else
      if selectionStatus
        $(selection).addClass('active')
      else
        $(selection).removeClass('active')
        

    ## Store filters
    for filter in $filters
      if $(filter).hasClass('active')
        @activeFilters.push $(filter).data('filter')
      

    @allFilters[category] = @activeFilters
    @setFilters()





  events: ->  
    plugin = @

    $(@options.filtersnav__dropdown).on 'mouseenter mouseleave', ->
      $(this).find(plugin.options.filter__children).toggle()
      
    $(@options.filtersnav__filter).on 'click', ->
      plugin.filterChange(@)
      







