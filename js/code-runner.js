let pyodide;

async function initPyodide() {
    pyodide = await loadPyodide();
    await pyodide.loadPackage(["pandas", "numpy"]);
}

async function runCode(editorId, outputId) {
    const code = document.getElementById(editorId).value;
    const output = document.getElementById(outputId);
    output.textContent = "运行中...";
    try {
        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);
        await pyodide.runPythonAsync(code);
        const res = pyodide.runPython("sys.stdout.getvalue()");
        output.textContent = res || "执行完成，无输出";
    } catch (e) {
        output.textContent = "错误：" + e.message;
    }
}

window.onload = initPyodide;