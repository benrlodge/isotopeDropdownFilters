
$.fn.isotopeDropdownFilters = (pluginOptions) ->
  @each (i, element) -> new isotopeDropdownFilters($(element), pluginOptions)


class isotopeDropdownFilters
  defaults:
    container:            '.item-container'
    filtersnav__filter:   '.filtersnav__filter'
    filtersnav__dropdown: '.filtersnav__dropdown'
    filter__children:     '.filtersnav__dropdown-items'
    filtersnav__item:     '.filtersnav__dropdown-item'
    sizeDropdowns:        true

  constructor: (@element, options) ->
    @options = $.extend({}, @defaults, options)
    @allFilters = {}
    @init()
    @events()
    
  init: ->
    $("[data-filter='all'").prop('checked',true)
    $(".filtersnav__filter").addClass('active')
    @updateFilters()
    @sizeDropdowns() if @options.sizeDropdowns


  ## Size dropdown containers to be the same width as the top level button
  sizeDropdowns: ->


  ## Prepare filters for isotope
  setFilters: ->
    
    i = 0
    comboFilters = []
    message = []
    isoFilters = ''

    for prop of @allFilters
      if prop == '' || undefined || null
        continue
      
      message.push @allFilters[prop].join(" ")
      filterGroup = @allFilters[prop]
      
      # skip to next filter group if it doesn't have any values
      continue unless filterGroup.length
      
      # copy to new array
      if i is 0    
        comboFilters = filterGroup.slice(0)
      
      else
        # copy to fresh array if new data type is chosen
        filterSelectors = []
        groupCombo = comboFilters.slice(0) # [ A, B ]
        
        # merge filter Groups
        k = 0
        len3 = filterGroup.length

        while k < len3
          j = 0
          len2 = groupCombo.length

          while j < len2
            filterSelectors.push groupCombo[j] + filterGroup[k] # [ 1, 2 ]
            j++
          k++
        
        # apply filter selectors to combo filters for next group
        comboFilters = filterSelectors
      i++


    isoFilters = comboFilters.join(", ")
    console.log isoFilters
    
    $(@options.container).isotope({ filter: isoFilters })
    @cleanUpFilters()
    console.log @allFilters









  ## Right now this method just checks the 'all' button
  ## if no options are checked. Eventually I want
  ## to clean this up and put in the 
  ## filterChange or updateFilters functions

  cleanUpFilters: ->
    parents = $('.filtersnav__dropdown')
    
    for parent in parents
      count = 0
      children = $(parent).find('.filtersnav__filter')
    
      for child in children when $(child).data('filter') isnt 'all'
        if $(child).hasClass('active')
          count++

      if count is 0
        $(parent).find("[data-filter='all']").checked(true)



  ## Adds active filters to the @allFilters object
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
    




  ## Sets active label and checkbox status in the DOM
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
        for item in $filters when $(item).data('filter') isnt 'all'
            $(item).closest('.filtersnav__dropdown-item').find('input').prop('checked',false).addClass('active')
            @activeFilters.push $(item).data('filter')
        $(selection).addClass('active')

      @allFilters[category] = @activeFilters
      @updateFilters()
      return




    if $allFilter.hasClass('active')
      $filters.checked(false)
      $(selection).checked(true)

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
      


## Helpers

$.fn.checked = (status) ->
  if status
    this.addClass('active').prop('checked', true)
  else
    this.removeClass('active').prop('checked', false)





