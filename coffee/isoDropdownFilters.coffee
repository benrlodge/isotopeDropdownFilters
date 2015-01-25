
$.fn.istopeDropdownFilters = (pluginOptions) ->
  @each (i, element) -> new istopeDropdownFilters($(element), pluginOptions)


class istopeDropdownFilters
  defaults:
    container:            '.item-container'
    filtersnav__filter:   '.filtersnav__filter'
    filtersnav__dropdown: '.filtersnav__dropdown'
    filter__children:     '.filtersnav__dropdown-items'
    filtersnav__item:     '.filtersnav__dropdown-item'

  constructor: (@element, options) ->
    @options = $.extend({}, @defaults, options)
    @allFilters = {}
    @init()
    @events()
    
  init: ->
    $("[data-filter='all'").prop('checked',true)
    $(".filtersnav__filter").addClass('active')
    @updateFilters()
    @sizeDropdowns()


  ## Size dropdown containers to be the same width as the top level button
  sizeDropdowns: ->


  setFilters: ->
    allGroups = Object.keys(@allFilters).map (key) => @allFilters[key]    
    allValues = []

    allGroups.forEach (group, i) ->
      otherValues = Array.prototype.concat.apply [], allGroups.slice(i + 1)  
      group.forEach (v1) -> 
        otherValues.forEach (v2) -> 
          allValues.push(v1 + v2)

    $(@options.container).isotope({ filter: allValues.join(', ') })



  updateFilters: ->
    parents = $('.filtersnav__dropdown')
    for parent in parents
      parentName = $(parent).data('filter-group')
      children = $(parent).find('.filtersnav__filter')
      @allFilters[parentName] = []
      for child in children
        if $(child).data('filter') isnt 'all'
          if $(child).hasClass('active')
            @allFilters[parentName].push( $(child).data('filter') )
    @setFilters()
    




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
        $(selection).prop('checked',true)
        return


      else
        for item in $filters
          if $(item).data('filter') isnt 'all'
            $(item).closest('.filtersnav__dropdown-item')
                   .find('input')
                   .prop('checked', false)
                   .addClass('active')

            @activeFilters.push $(item).data('filter')
        
        $(selection).addClass('active')

      @allFilters[category] = @activeFilters
      @updateFilters()
      return

      
    if $allFilter.hasClass('active')
      $filters.removeClass('active').prop('checked', false)      
      $(selection).addClass('active').prop('checked', true)

    else
      if selectionStatus
        $(selection).addClass('active')
      else
        $(selection).removeClass('active')
        
    @allFilters[category] = @activeFilters
    @updateFilters()





  events: ->  
    plugin = @

    $(@options.filtersnav__dropdown).on 'mouseenter mouseleave', ->
      $(this).find(plugin.options.filter__children).toggle()
      
    $(@options.filtersnav__filter).on 'click', ->
      plugin.filterChange(@)
      







