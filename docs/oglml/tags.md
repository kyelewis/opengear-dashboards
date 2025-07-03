# api
Location for global ogScript code- global should generally be placed with a meta tag, UI manipulation code should be top-level.

# meta
Convenient parent tag for non-ui tags.

# widgets & widgetdescriptor

```xml
<widgets>
  <widgetdescriptor id="my-widget" ...>
    <config>
      <params>
        <param access="1" type="STRING" oid="one", name="One">
      </params>
      <olgml>
        <!-- Optional configuration editor markup -->
      </olgml>
    </config>

    <oglml>
      <meta>
        <params></params>
         <api></api>
         </meta>

      <simplegrid>
        <param oid="one">
      </simplegrid>
      </oglml>

  ...</widgetdescriptor>
</widgets>
```

```xml
<widgets>
  <widgetdescriptor id="my-widget" baseurl="http://somewhere.com/" />
</widgets>
```

# lookup

Constants to be substituted inside of tag attributes.

```xml
<lookup id="MyLookup" scope="private | public | window" code="true" multiline="true">
  <entry key="Thing">value</entry>
</lookup>
```

```xml
<ogscript handles="onload">%const['MyLookup']['Thing']%</ogscript>
````

# style

```xml
<style id="GoodStyle" value="bg#FFFFFF"/>
<button name="This" style="style:GoodStyle;"/>
```

# color

```xml
<color id="Red" value="#FF0000"/>
<button name="Button" style="bg#Red"/>
```

# ogscript

## Parameter Change
```xml
<ogscript handles="onchange" oid="oid.*">
...
</ogscript>
```

## Tab Change
```xml
<ogscript handles="onchange" targetid="target-id" element="1">
...
</ogscript>
```

## Context Menu
```xml
<ogscript handles="oncontextmenu" targetid="some-id">
  contextMenu = { "One": function() {
    ogscript.debug("One");
  } };

  return contextMenu;
</ogscript>
```

# params

# timer

```xml
<timer id=”timer-id” rate="2000" autostart="true"/>
<timertask tasktype="task-type" timerid=”timer-id”>ogScript Code</timertask>
```

# listener

```
<listener autostart="true" delimitertype="newline" listenport="12345">
 <task tasktype="ogscript">
  if (event.isMessageEvent()) {
    var rec = event.getBytesAsString().trim();
 }
 </task>
</listener>
```

# task

 Task to be run with an event happens in the system:
 - Label tags, button tags, listener tags

# include
