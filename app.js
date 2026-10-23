"use strict";

// Gig Shift Planner: real take-home per hour = (pay + tips - car cost) / (busy + dead minutes) * 60
// Busy minutes and dead minutes are both work. The app only pays for one of them.

function num(id) {
  var v = parseFloat(document.getElementById(id).value);
  if (isNaN(v) || v < 0) { return 0; }
  return v;
}

function readShift(prefix, label) {
  var fare = num(prefix + "-fare");
  var tips = num(prefix + "-tips");
  var drive = num(prefix + "-drive");
  var dead = num(prefix + "-dead");
  var miles = num(prefix + "-miles");
  var cpm = num(prefix + "-cpm");
  var carCost = miles * cpm;
  var gross = fare + tips;
  var net = gross - carCost;
  var minutes = drive + dead;
  var rate = minutes > 0 ? (net / minutes) * 60 : 0;
  return {
    label: label,
    gross: gross,
    carCost: carCost,
    net: net,
    busy: drive,
    dead: dead,
    minutes: minutes,
    miles: miles,
    rate: rate,
    deadShare: minutes > 0 ? dead / minutes : 0
  };
}

function money(x) { return "$" + x.toFixed(2); }

function pct(x) { return Math.round(x * 100) + "%"; }

function compare() {
  var a = readShift("a", "Shift 1");
  var b = readShift("b", "Shift 2");

  var out = document.getElementById("out");
  var verdict = document.getElementById("verdict");
  var rows = document.getElementById("rows");

  var winner = null;
  if (a.minutes > 0 && b.minutes > 0) {
    if (a.rate > b.rate) { winner = a; }
    else if (b.rate > a.rate) { winner = b; }
  } else if (a.minutes > 0) { winner = a; }
  else if (b.minutes > 0) { winner = b; }

  if (winner) {
    var other = winner === a ? b : a;
    var diff = Math.abs(a.rate - b.rate);
    verdict.textContent = winner.label + " wins: " + money(winner.rate) +
      " per hour real take-home, " + money(diff) + " per hour apart.";
    verdict.className = winner.rate < 15 ? "warn" : "";
    if (winner.rate < 15) {
      var note = document.createElement("p");
      note.textContent = "Both shifts land under $15 per hour. The gap between them is real, and so is the problem.";
      note.id = "lowbar";
      if (!document.getElementById("lowbar")) { verdict.parentNode.insertBefore(note, verdict.nextSibling); }
    }
  } else {
    verdict.textContent = "Enter paid minutes for at least one shift.";
  }

  rows.innerHTML = "";
  [a, b].forEach(function (s) {
    var tr = document.createElement("tr");
    if (winner === s) { tr.className = "win"; }
    [s.label, money(s.gross), money(s.carCost), money(s.net),
     s.busy + "m", s.dead + "m (" + pct(s.deadShare) + ")",
     s.minutes + "m", money(s.rate) + "/hr"].forEach(function (cell) {
      var td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    rows.appendChild(tr);
  });

  out.hidden = false;
}

var go = document.getElementById("go");
if (go) { go.addEventListener("click", compare); }
