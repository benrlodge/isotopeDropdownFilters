
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
    console.log 'setting filters:'
    console.log @activeFilters

    
    # $(selection).find(@options.filter__children).toggle()
    # $(selection).closest('.filtersnav__dropdown')
    #             .find(@options.selected__label).text($(selection).text())

    # filterValue = $(selection).find('a').data('filter')

    # # $container.isotope filter: filterValue
    # $(@options.container).isotope({ filter: filterValue })





  ## Set active label and filter
  filterChange: (selection) ->
   
    @activeFilters = []
    isActive = $(selection).hasClass('active')
    $filter = $(selection).data('filter')
    $parentFilter = $(selection).closest(@options.filter__children)
    $filters = $parentFilter.find('.filtersnav__filter')

    if $filter is 'all'
            
      if isActive
        $(selection).removeClass('active')
        for item in $filters
          $(item).closest('.filtersnav__dropdown-item').find('input').prop('checked', false);
        @activeFilters = []

      else
        $(selection).addClass('active')
        for item in $filters
          $(item).closest('.filtersnav__dropdown-item').find('input').prop('checked', true);
          if $(item).data('filter') isnt 'all'
            @activeFilters.push $(item).data('filter')
        
      @setFilters()
      return
      

    ## check if all is selected, remove active state if so
    for filter in $filters
      if $(filter).attr('data-filter') is 'all' and $(filter).hasClass 'active'

        $("[data-filter='all']").removeClass('active').prop('checked', false)
      

    if $(selection).prop('checked')
      $(selection).addClass('active')
    
    else
      $(selection).removeClass('active')

    for filter in $filters
      if $(filter).hasClass('active')
        @activeFilters.push $(filter).data('filter')

      
    @setFilters()





  events: ->  
    plugin = @

    $(@options.filtersnav__dropdown).on 'mouseenter mouseleave', ->
      $(this).find(plugin.options.filter__children).toggle()
      
    $(@options.filtersnav__filter).on 'click', ->
      plugin.filterChange(@)
      







