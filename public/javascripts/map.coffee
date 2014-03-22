initMap = ->
  createMap()
  setMapEvent()
  addMapControl()
  addMarker()

createMap = ->
  map = new BMap.Map('map-content')
  point = new BMap.Point(106.524122,29.577576)
  map.centerAndZoom(point, 17)
  window.map = map

setMapEvent = ->
  map.enableDragging()
  map.enableScrollWheelZoom()
  map.enableDoubleClickZoom()
  map.enableKeyboard()

addMapControl = ->
  ctrl_nav = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      type: BMAP_NAVIGATION_CONTROL_LARGE
    })
  ctrl_ove = new BMap.OverviewMapControl({
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      isOpen: 1
    })
  ctrl_sca = new BMap.ScaleControl({
      anchor: BMAP_ANCHOR_BOTTOM_LEFT
    })
  map.addControl ctrl_nav
  map.addControl ctrl_ove
  map.addControl ctrl_sca


markerArr =
  {
    title: "宇宙中心"
    content: "呵呵"
    point: "106.525173|29.577309"
    isOpen: 0
    icon: {
      w: 21
      h: 21
      l: 0
      t: 0
      x: 6
      lb: 5
    }
  }

addMarker = ->
  for json, i in markerArr
    p0 = json.point.split('|')[0]
    p1 = json.point.split('|')[1]
    point = new BMap.Point(p0, p1)
    iconImg = createIcon(json.icon)
    marker = new BMap.Marker(point, {
        icon: iconImg
      })
    iw = createInfoWindow i
    label = new BMap.Label(json.title, {
        "offset": new BMap.Size(json.icon.lb-json.icon.x+10,-20)
      })
    marker.setLabel label
    map.addOverlay marker
    label.setStyle({
        borderColor: '#808080',
        color: '#333',
        cursor: 'pointer'
      })
    (->
      index = i
      _iw = createInfoWindow i
      _marker = marker
      _marker.addEventListener('click', ->
        @openInfoWindow _iw
      )
      _iw.addEventListener('open', ->
        _marker.getLabel().hide()
      )
      _iw.addEventListener('close', ->
        _marker.getLabel().show()
      )
      label.addEventListener('click', ->
        _marker.openInfoWindow _iw
      )
      if json.isOpen
        label.hide()
        _marker.openInfoWindow _iw
    )()

createInfoWindow = (i) ->
  json = markerArr[i]
  iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>")

createIcon = (json) ->
  icon = new BMap.Icon('http://app.baidu.com/map/images/us_mk_icon.png', new BMap.Size(json.w, json.h), {imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})

initMap()