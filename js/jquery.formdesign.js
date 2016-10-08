(function (a)
{
    a.fn.formDesign = function ()
    {
        this.each(function ()
        {
            if (this.type === "radio" || this.type === "checkbox" || this.type === "select-one" || this.type === "select-multiple")
            {
                var b = a(this), h = a('label[for="' + b.attr("id") + '"]');
                b.hide();
                if (this.type === "radio" || this.type === "checkbox")
                {
                    var j = this.type.replace(/^./, this.type.match(/^./)[0].toUpperCase()), k = a('<span class="forms' + j + 'Img"></span>'), 
                    e = a('<span class="forms' + j + '"></span>');
                    e.toggleClass("selected", b.is(":checked"));
                    e.data("name", b.attr("name"));
                    if (this.type === "radio")
                    {
                        e.click(function (c) 
                        {
                            c.preventDefault();
                            if (!b.is(":checked")) 
                            {
                                b.attr("checked", false);
                                a(".formsRadio").filter(function () 
                                {
                                    return a(this).data("name") === b.attr("name");
                                }).removeClass("selected");
                                b.attr("checked", true);
                                a(this).addClass("selected") 
                            }
                        });
                    }
                    else if (this.type === "checkbox")
                    {
                        a(".checkAll").toggle(function ()
                        {
                            var c = a(this).attr("class").split(" ");
                            for (name in c)
                            {
                                if (c[name] != "checkAll") 
                                {
                                    a(".formsCheckbox").filter(function () 
                                    {
                                        return a(this).data("name") === c[name];

                                    }).addClass("selected");
                                    a(':checkbox[name="' + c[name] + '"]').attr("checked", true) 
                                }
                                //return false;
                            }
                        },
                        function ()
                        {
                            var c = a(this).attr("class").split(" ");
                            for (name in c)
                            {							
                                if (c[name] != "checkAll") 
                                {

                                    a(".formsCheckbox").filter(function () 
                                    {
                                        return a(this).data("name") === c[name];
                                    }).removeClass("selected");
                                    a(':checkbox[name="' + c[name] + '"]').attr("checked", false) 
                                }
                                //return false;
                            }
                        });
                        e.click(function (c)
                        {
                            c.preventDefault();
                            b.attr("checked", b.is(":checked") ? false : true);
                            a(this).toggleClass("selected", b.is(":checked"))
                        })
                    }
                    k.insertAfter(b).add(h).wrapAll(e)
                }
                else if (this.type === "select-one")
                {
                    e = a('<span class="formsSelect"></span>');
                    h = b.children("option");
                    k = (j = !!b.has("optgroup").length) ? b.children("optgroup") : null;
                    var l = j ? b.find("option:selected").text() : h.filter(":selected").text(), g = a('<ul class="formsSelectOptions"></ul>').hide();

                    e.data("name", b.attr("name"));
                    g.data("name", b.attr("name"));
                    j ? k.each(function ()
                    {
                        var c = a('<li class="formsOptGroup">' + a(this).attr("label") + "</li>");
                        g.append(c);
                        a(this).children("option").each(function (d, f)
                        {
                            var m = a(f).text() !== "" ? a(f).text() : "&nbsp;";
                            g.append(a("<li>" + m + "</li>").data("value", a(f).val()))
                        })
                    }) : h.each(function (c, d)
                    {
                        var f = a(d).text() !== "" ? a(d).text() : "&nbsp;";
                        g.append(a("<li>" + f + "</li>").data("value", a(d).val()))
                    });
                    e.click(function (c)
                    {
                        c.stopPropagation();
                        g.css(
                        {
                            position : "absolute", top : e.offset().top + e.outerHeight() - 1, left : e.offset().left, 
                            zIndex : "9999"
                        });
                        g.slideToggle()
                    });
                    a(document).click(function (c)
                    {
                        a(c.target).parents(".formsSelectOptions").length || g.slideUp()
                    });
                    g.delegate("li", "click", function (c)
                    {
                        if (!a(c.target).hasClass("formsOptGroup")) {
                            g.slideUp();
                            e.html(a(this).html());
                            b.val(a(this).data("value"))
                        }
                    });
                    e.html(l !== "" ? l : "&nbsp;").insertAfter(b).after(g);
                    jQuery.browser.msie && parseInt(jQuery.browser.version) <= 6 && g.children("li").css("width", 
                    g.width())
                }
                else if (this.type === "select-multiple")
                {
                    e = a('<ul class="formsSelectMultiple"></ul>').data("name", b.attr("name"));
                    h = b.children("option");
                    b.children("option:selected");
                    var i = null;
                    b.hide();
                    h.each(function (c, d)
                    {
                        var f = a(d).text() !== "" ? a(d).text() : "&nbsp;";
                        f = a("<li>" + f + "</li>").data("value", a(d).val());
                        f.toggleClass("selected", a(d).is(":selected"));
                        e.append(f)
                    });
                    e.delegate("li", "click", function (c)
                    {
                        if (c.shiftKey) if (i === null)
                        {
                            b.children('option[value="' + a(this).data("value") + '"]').prevAll().andSelf().attr("selected", 
                            true);
                            a(this).prevAll().andSelf().addClass("selected");
                            b.children('option[value="' + a(this).data("value") + '"]').nextAll().attr("selected", 
                            false);
                            a(this).nextAll().removeClass("selected")
                        }
                        else
                        {
                            var d = i.index() <= a(this).index() ? i.index() : a(this).index(), f = i.index() <= a(this).index() ? a(this).index() + 1 : i.index() + 1;
                            c = a(this).siblings().andSelf().slice(d, f);
                            d = b.children("option").slice(d, f);
                            d.attr("selected", true);
                            c.addClass("selected");
                            b.children("option").not(d).attr("selected", false);
                            a(this).siblings().not(c).removeClass("selected")
                        }
                        else
                        {
                            i = a(this);
                            d = b.children('option[value="' + a(this).data("value") + '"]');
                            if (c.ctrlKey) if (d.is(":selected")) {
                                d.attr("selected", false);
                                a(this).removeClass("selected")
                            }
                            else {
                                d.attr("selected", true);
                                a(this).addClass("selected")
                            }
                            else
                            {
                                d.attr("selected", true);
                                a(this).addClass("selected");
                                d.nextAll().each(function ()
                                {
                                    a(this).attr("selected", false)
                                });
                                d.prevAll().each(function ()
                                {
                                    a(this).attr("selected", false)
                                });
                                a(this).prevAll("li").removeClass("selected");
                                a(this).nextAll("li").removeClass("selected")
                            }
                        }
                    });
                    e.insertAfter(b);
                    e.css("width", e.width() + 20)
                }
            }
        });
        return this;
    }
})(jQuery);
