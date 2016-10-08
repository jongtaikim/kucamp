FileAttach = function() {
	this.bytes = 0;

	this.setForm = function(form) {
		this.f = form;
	}

	this.addFile = function(obj) {
		this.addList(obj.filename,obj.fileid);
		this.incByte(obj.filesize);
	}

	this.removeFile = function(id,size) {
		var list = this.f.listbox;
		for (var i=0,cnt=list.options.length; i<cnt; i++) {
			if (list.options[i].value == id) {
				list.options[i] = null;
				this.decByte(size);
				return;
			}
		}
	}

	this.addList = function(name,id) {
		this.f.listbox.add(new Option(name,id));
	}

	this.incByte = function(size) {
		this.bytes+= size;
		this.f.sizebox.value = Math.round(this.bytes/1024,2);
	}

	this.decByte = function(size) {
		this.bytes-= size;
		this.f.sizebox.value = Math.round(this.bytes/1024,2);
	}
}