
jQuery( document ).ready(function() {
  /*Sticky Header*/
  jQuery(window).scroll(function(){
    var sticky = jQuery('.sticky'),
        scroll = jQuery(window).scrollTop();
    if (scroll >= 30) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
  });
  /*Sticky Header End*/
  /*Header Spacer Start*/
  jQuery(window).on('resize', function () {
    var mastHeight = jQuery('header').outerHeight();
    jQuery('.header-spacer').css('height', mastHeight); 
  });
  jQuery(window).trigger('resize');
  /*Header Spacer End*/
  /*Accordion Start*/
  jQuery('.accordion').click(function(e) {
    jQuery('.panel').slideUp();
    jQuery('.active').not(this).removeClass('active');
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
    jQuery(this).next('.panel').slideUp();
    }else{
        jQuery(this).addClass('active');
        jQuery(this).next('.panel').slideDown();
    }
  });
  /*Accordion End*/
  /*Logo Slider Start*/
  jQuery('.l-carousel').owlCarousel({
    loop:true,
    margin:45,
    nav:true,
    navText: ["<img src='/wp-content/themes/base/images/Arrow-left.svg'>","<img src='/wp-content/themes/base/images/Arrow-right.svg'>"],
    items:6,
    responsive:
    {
        0:
        {
            items:1,
            dots: false,
            autowidth: true,
            margin:15,
            nav: false
        },
        375:
        {
            items:2,
            margin:0,
            dots: false,
            autowidth: true,
            nav: false
        },
        481:
        {
            items:3,
            dots: false,
            margin:0,
            nav:true
        },
        1024:
        {
            items:5,
            margin:20,
            nav:true
        },
        1280:
        {
            nav:true,
            items:6,
            margin:26
        }
    }
  });
  /*Logo Slider End*/
  /*Search box Start*/
  jQuery('.search-icon a').click(function(){
    jQuery('.search-block').slideToggle();
  });
  /*Search box End*/
  /*Mobile menu Start*/
  jQuery('#menu-icon').click(function(){
      jQuery(this).toggleClass('menu-open');
      jQuery('.menu-column').toggleClass('active-mobile-menu');
  });
  /*Mobile menu End*/
});



$(document).ready(function () {

    $("#test").CreateMultiCheckBox({defaultText : 'Filter by category'});
    $("#test2").CreateMultiCheckBox({defaultText : 'Filter by location'});
    $("#test4").CreateMultiCheckBox({defaultText : 'Filter by category'});
    $("#test5").CreateMultiCheckBox({defaultText : 'Filter by category'});
    $("#test6").CreateMultiCheckBox({defaultText : 'Filter by location'});
    
    $(document).on("click", ".MultiCheckBox", function () {
        var detail = $(this).next();
        detail.show();
    });


    $(document).on("click", ".MultiCheckBoxDetail .cont input", function (e) {
        e.stopPropagation();
        $(this).closest(".MultiCheckBoxDetail").next().UpdateSelect();

        var val = ($(".MultiCheckBoxDetailBody input:checked").length == $(".MultiCheckBoxDetailBody input").length)
        $(".MultiCheckBoxDetailHeader input").prop("checked", val);
    });

    $(document).on("click", ".MultiCheckBoxDetail .cont", function (e) {
        var inp = $(this).find("input");
        var chk = inp.prop("checked");
        inp.prop("checked", !chk);

        var multiCheckBoxDetail = $(this).closest(".MultiCheckBoxDetail");
        var multiCheckBoxDetailBody = $(this).closest(".MultiCheckBoxDetailBody");
        multiCheckBoxDetail.next().UpdateSelect();

        var val = ($(".MultiCheckBoxDetailBody input:checked").length == $(".MultiCheckBoxDetailBody input").length)
        $(".MultiCheckBoxDetailHeader input").prop("checked", val);
    });

    $(document).mouseup(function (e) {
        var container = $(".MultiCheckBoxDetail");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });
});

var defaultMultiCheckBoxOption = {defaultText: 'Select Below'};

jQuery.fn.extend({
    CreateMultiCheckBox: function (options) {

        var localOption = {};
        localOption.width = (options != null && options.width != null && options.width != undefined) ? options.width : defaultMultiCheckBoxOption.width;
        localOption.defaultText = (options != null && options.defaultText != null && options.defaultText != undefined) ? options.defaultText : defaultMultiCheckBoxOption.defaultText;
        localOption.height = (options != null && options.height != null && options.height != undefined) ? options.height : defaultMultiCheckBoxOption.height;

        this.hide();
        this.attr("multiple", "multiple");
        var divSel = $("<div class='MultiCheckBox'>" + localOption.defaultText + "<span class='k-icon k-i-arrow-60-down'></span></div>").insertBefore(this);
        divSel.css({ "width": localOption.width });

        var detail = $("<div class='MultiCheckBoxDetail'><div class='MultiCheckBoxDetailHeader'><div></div></div><div class='MultiCheckBoxDetailBody'></div><div class='filter-submit d-flex justify-center mobile'><button type='submit' class='btn btn-border'>Cancel</button><input type='submit' value='Apply' class='btn'></div></div>").insertAfter(divSel);
        detail.css({ "width": parseInt(options.width) + 10, "max-height": localOption.height });
        var multiCheckBoxDetailBody = detail.find(".MultiCheckBoxDetailBody");

        this.find("option").each(function () {
            var val = $(this).attr("value");

            if (val == undefined)
                val = '';

            multiCheckBoxDetailBody.append("<div class='cont'><div><label class='container-checkbox'><input type='checkbox' class='mulinput' value='" + val + "' /><span class='checkmark'></span></label></div><div class='select-text'>" + $(this).text() + "</div></div>");
        });

        multiCheckBoxDetailBody.css("max-height", (parseInt($(".MultiCheckBoxDetail").css("max-height")) - 28) + "px");
    },
    UpdateSelect: function () {
        var arr = [];

        this.prev().find(".mulinput:checked").each(function () {
            arr.push($(this).val());
        });

        this.val(arr);
    },
});


// (function($) {
//   var CheckboxDropdown = function(el) {
//     var _this = this;
//     this.isOpen = false;
//     this.areAllChecked = false;
//     this.$el = $(el);
//     this.$label = this.$el.find('.dropdown-label');
//     this.$checkAll = this.$el.find('[data-toggle="check-all"]').first();
//     this.$inputs = this.$el.find('[type="checkbox"]');
    
//     this.onCheckBox();
    
//     this.$label.on('click', function(e) {
//       e.preventDefault();
//       _this.toggleOpen();
//     });
    
//     this.$checkAll.on('click', function(e) {
//       e.preventDefault();
//       _this.onCheckAll();
//     });
    
//     this.$inputs.on('change', function(e) {
//       _this.onCheckBox();
//     });
//   };
  
//   CheckboxDropdown.prototype.onCheckBox = function() {
//     this.updateStatus();
//   };
  
//   CheckboxDropdown.prototype.updateStatus = function() {
//     var checked = this.$el.find(':checked');
    
//     this.areAllChecked = false;
//     this.$checkAll.html('Check All');
    
//     if(checked.length <= 0) {
//       this.$label.html('Select Options');
//     }
//     else if(checked.length === 1) {
//       this.$label.html(checked.parent('label').text());
//     }
//     else if(checked.length === this.$inputs.length) {
//       this.$label.html('All Selected');
//       this.areAllChecked = true;
//       this.$checkAll.html('Uncheck All');
//     }
//     else {
//       this.$label.html(checked.length + ' Selected');
//     }
//   };
  
//   CheckboxDropdown.prototype.onCheckAll = function(checkAll) {
//     if(!this.areAllChecked || checkAll) {
//       this.areAllChecked = true;
//       this.$checkAll.html('Uncheck All');
//       this.$inputs.prop('checked', true);
//     }
//     else {
//       this.areAllChecked = false;
//       this.$checkAll.html('Check All');
//       this.$inputs.prop('checked', false);
//     }
    
//     this.updateStatus();
//   };
  
//   CheckboxDropdown.prototype.toggleOpen = function(forceOpen) {
//     var _this = this;
    
//     if(!this.isOpen || forceOpen) {
//        this.isOpen = true;
//        this.$el.addClass('on');
//       $(document).on('click', function(e) {
//         if(!$(e.target).closest('[data-control]').length) {
//          _this.toggleOpen();
//         }
//       });
//     }
//     else {
//       this.isOpen = false;
//       this.$el.removeClass('on');
//       $(document).off('click');
//     }
//   };
  
//   var checkboxesDropdowns = document.querySelectorAll('[data-control="checkbox-dropdown"]');
//   for(var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
//     new CheckboxDropdown(checkboxesDropdowns[i]);
//   }
// })(jQuery);