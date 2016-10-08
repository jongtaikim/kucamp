<?php
require_once 'XML/Parser.php';

class myParser extends XML_Parser
{
    var $vars = array();
    var $cur_item = -1;
    var $tmp_sub = array();
    var $cur_sub = -1;
  function myParser()
  {
    parent::XML_Parser();
  }

  function startHandler($xp, $name, $attr)
  {
    switch($name) {
        
        case 'ITEM':
            $this->cur_item++;
            $this->vars[$this->cur_item] = $attr;
            break;
        case 'SUB':
            $this->cur_sub++;
            $this->tmp_sub = $attr;
            break;
    }

  }

  function endHandler($xp, $name)
  {
    switch($name) {
        case 'ITEM':
            $this->cur_sub = -1;
            break;
        case 'SUB':
            $this->vars[$this->cur_item]['SUBS'][$this->cur_sub] = $this->tmp_sub;
            $this->tmp_sub = array();
            break;
    }
    
  }

  function cdataHandler($xp, $cdata)
  {
     $this->tmp_sub['NAME'] = $cdata;
  }
}

$p = &new myParser();

$result = $p->setInputFile('hosts/a1.ezgrape.net/menu.xml');
$result = $p->parse();
print_r($p->vars);
?>
