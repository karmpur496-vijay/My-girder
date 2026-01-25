<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Work Report</title>
    <style>
        :root {
            --primary: #1e3a8a;
            --secondary: #f39c12;
            --bg: #f8fafc;
            --card: #ffffff;
            --text: #1e293b;
            --border: #e2e8f0;
        }

        body { 
            font-family: 'Segoe UI', sans-serif; 
            background: var(--bg); 
            color: var(--text); 
            margin: 0; padding: 15px; 
        }

        .header { background: var(--primary); color: white; padding: 15px; border-radius: 10px; margin-bottom: 20px; display: flex; align-items: center; }
        .back-btn { color: white; text-decoration: none; font-size: 20px; margin-right: 15px; }

        .form-card { background: var(--card); padding: 20px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; font-weight: 600; margin-bottom: 5px; font-size: 14px; }
        input, select, textarea { width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 8px; box-sizing: border-box; }

        .btn-save { background: var(--secondary); color: white; border: none; padding: 12px; width: 100%; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px; }
        
        .report-table { width: 100%; border-collapse: collapse; background: var(--card); border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .report-table th { background: #f1f5f9; padding: 12px; text-align: left; font-size: 12px; color: var(--muted); }
        .report-table td { padding: 12px; border-top: 1px solid var(--border); font-size: 14px; }
        .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; background: #dcfce7; color: #166534; }
    </style>
</head>
<body>

    <div class="header">
        <a href="index.html" class="back-btn">⬅</a>
        <h2 style="margin:0; font-size: 18px;">Daily Work Entry</h2>
    </div>

    <div class="form-card">
        <div class="form-group">
            <label>तारीख (Date)</label>
            <input type="date" id="workDate">
        </div>
        <div class="form-group">
            <label>गर्डर नंबर (Girder No.)</label>
            <input type="text" id="girderNo" placeholder="जैसे: G-01, S-12">
        </div>
        <div class="form-group">
            <label>कार्य का प्रकार (Work Type)</label>
            <select id="workType">
                <option value="Casting">Casting (ढलाई)</option>
                <option value="Stressing">Stressing (स्ट्रेसिंग)</option>
                <option value="Grouting">Grouting (ग्राउटिंग)</option>
                <option value="Shifting">Shifting (शिफ्टिंग)</option>
            </select>
        </div>
        <div class="form-group">
            <label>रिमार्क (Remark)</label>
            <textarea id="remark" rows="2" placeholder="कोई विशेष जानकारी..."></textarea>
        </div>
        <button class="btn-save" onclick="saveData()">डेटा सेव करें</button>
    </div>

    <h3 style="font-size: 16px;">हालिया एंट्री (Recent Entries)</h3>
    <table class="report-table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Girder</th>
                <th>Work</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody id="dataTable">
            </tbody>
    </table>

    <script>
        // आज की तारीख ऑटो-सेट करें
        document.getElementById('workDate').valueAsDate = new Date();

        function saveData() {
            const date = document.getElementById('workDate').value;
            const girder = document.getElementById('girderNo').value;
            const type = document.getElementById('workType').value;
            const remark = document.getElementById('remark').value;

            if(!girder) { alert("गर्डर नंबर डालें!"); return; }

            const table = document.getElementById('dataTable');
            const row = table.insertRow(0);
            row.innerHTML = `
                <td>${date}</td>
                <td><b>${girder}</b></td>
                <td>${type}</td>
                <td><span class="status-badge">Done</span></td>
            `;

            // फॉर्म साफ़ करें
            document.getElementById('girderNo').value = "";
            document.getElementById('remark').value = "";
            alert("Entry Saved Successfully!");
        }
    </script>
</body>
</html>
