enyoBench.speedKind({
	name: "enyoBench.MoonDataListScrollingTest",
	kind: "enyoBench.SpeedTest",
	testName: "Vertical List, Moonstone Scroller (1000 items)",
	view: enyo.kind({
		kind: "enyo.FittableRows",
		components: [{
			kind: "moon.DataList",
			name: "list",
			fit: true,
			renderDelay: null,
			components: [
				{ components: [{
					name: "label"
				}],
				bindings: [
					{ from: "model.idx", to: "$.label.content" }
				]
			}]
		}]
	}),
	runTest: function() {
		var data=[], i;
		for(i = 0; i < 1000; i++) {
			data.push({idx: "Moonstone Row " + i});
		}
		this.set("view.$.list.collection", new enyo.Collection(data));
		this.render();
		this.inherited(arguments);
		this.step = 0;
		this.nextStep();
	},
	nextStep: function(inSender, inEvent) {
		// exit early if we get event before test starts
		if (!enyo.exists(this.step)) {
			return true;
		}
		if (this.step === 0) {
			this.view.$.list.scrollToIndex(this.view.$.list.collection.length-1);
			this.startJob("scrolledToEnd", "nextStep", 3000);
		}
		else if (this.step === 1) {
			this.view.$.list.scrollToIndex(0);
			this.startJob("scrolledToStart", "nextStep", 3000);
		}
		else {
			this.testComplete();
		}
		this.step++;
		return true;
	}
});

enyoBench.speedKind({
	name: "enyoBench.NarrowMoonDataListScrollingTest",
	kind: "enyoBench.MoonDataListScrollingTest",
	testName: "Narrow Vertical DataList, Moonstone Scroller (1000 items)",
	view: enyo.kind({
		kind: "enyo.FittableRows",
		style: "width: 320px;",
		components: [{
			kind: "moon.DataList",
			name: "list",
			fit: true,
			renderDelay: null,
			components: [
				{ components: [{
					name: "label"
				}],
				bindings: [
					{ from: "model.idx", to: "$.label.content" }
				]
			}]
		}]
	})
});

enyoBench.speedKind({
	name: "enyoBench.StaticMoonScrollingTest",
	kind: "enyoBench.SpeedTest",
	testName: "Static Content, Moonstone Scroller (1000 items)",
	view: enyo.kind({
		kind: "enyo.FittableRows",
		components: [{
			name: "list",
			kind: "moon.Scroller",
			fit: true,
			components: [{
				kind: "enyo.Repeater",
				count: 1000,
				onSetupItem: "setupItem",
				components: [{
					name: "label"
				}]
			}]
		}],
		setupItem: function(inSender, inEvent) {
			var index = inEvent.index;
			var item = inEvent.item;
			item.$.label.setContent("Moonstone Static Row " + index);
			return true;
		}
	}),
	runTest: function() {
		this.render();
		this.inherited(arguments);
		this.step = 0;
		this.nextStep();
	},
	nextStep: function(inSender, inEvent) {
		// exit early if we get event before test starts
		if (!enyo.exists(this.step)) {
			return true;
		}
		if (this.step === 0) {
			this.view.$.list.scrollTo(0, this.view.$.list.getScrollBounds().maxTop);
			this.startJob("scrolledToEnd", "nextStep", 3000);
		}
		else if (this.step === 1) {
			this.view.$.list.scrollTo(0, 0);
			this.startJob("scrolledToStart", "nextStep", 3000);
		}
		else {
			this.testComplete();
		}
		this.step++;
		return true;
	}

});
