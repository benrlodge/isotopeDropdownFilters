

$.fn.isoMultiFilter = (options) ->

  defaults = 
    itemsContainer  :   $(".item-container")
    navContainer: $('.filtersnav')

  options = $.extend(defaults, options)

  filtersnav__dropdown = '.filtersnav__dropdown'
  filter__children = '.filtersnav__dropdown-items'
  filtersnav__item = '.filtersnav__dropdown-item'


  # Filtered information
  # detail__selected = data-filter-detail='selected'

  viewDetails = ->
    ## turn into loop
    $("[data-filter-detail='selected']").text('Yo!')


  filterChange = () ->
    console.log 'filter changed'
    viewDetails()


  events = ->

    # Hover on primary navigation
    $(filtersnav__dropdown).on 'mouseenter mouseleave', ->
      $(this).find(filter__children).toggle()
      
    # Click on navigation item
    $(filtersnav__item).on 'click', (ev) ->
      ev.preventDefault()
      $(this).find(filter__children).toggle()
      filterChange()
      
      

  init = ->
    console.log 'init'
    @events()



  @each ->
    console.log 'oh fuck yea'
    events()