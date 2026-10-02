/* Academy operations: browser-local preview records. */
function renderOperations(){
 const expenses=data.expenses||[], assets=data.assets||[];
 const total=expenses.reduce((s,x)=>s+Number(x.amount),0);
 $('#content').innerHTML=pageHead('Academy Operations','Track operating expenses, equipment and your workspace backup.')+
 `<div class="stats-grid">${stat('Operating Expenses',ethanMoney(total),'Recorded expenses','₦')}${stat('Equipment',assets.length,'Asset register','▤')}</div>
 <div class="dashboard-grid"><section class="card"><div class="card-head"><h3>Expense Register</h3><button class="primary-btn" id="addExpense">+ Expense</button></div>${expenses.length?table(['Date','Description','Category','Amount'],expenses.map(x=>[escHtml(x.date),escHtml(x.description),escHtml(x.category),ethanMoney(x.amount)])):emptyState('No expenses recorded','Add academy operating costs to start tracking expenditure.')}</section>
 <section class="card"><div class="card-head"><h3>Equipment Register</h3><button class="primary-btn" id="addAsset">+ Equipment</button></div>${assets.length?table(['Equipment','Serial / Reference','Condition'],assets.map(x=>[escHtml(x.name),escHtml(x.reference),escHtml(x.condition)])):emptyState('No equipment recorded','Register computers, projectors and academy equipment.')}</section></div>
 <section class="card"><h3>Workspace Backup</h3><p class="muted">Download records saved in this browser. Keep backups in a secure location.</p><button class="secondary-btn" id="downloadBackup">Download JSON Backup</button></section>`;
 $('#addExpense').onclick=()=>showModal('Record Expense','Enter the date, purpose and amount.',`<label>Date<input id="opDate" type="date" value="${new Date().toISOString().slice(0,10)}"></label><label>Description<input id="opDesc" maxlength="160"></label><label>Category<select id="opCat"><option>Utilities</option><option>Teaching materials</option><option>Staff</option><option>Maintenance</option><option>Marketing</option><option>Other</option></select></label><label>Amount (NGN)<input id="opAmount" type="number" min="0.01" step="0.01"></label>`,()=>{
 const description=$('#opDesc').value.trim(), amount=Number($('#opAmount').value), date=$('#opDate').value;
 if(!description||!date||!Number.isFinite(amount)||amount<=0)return alert('Enter a description, date and amount greater than zero.');
 data.expenses=[...(data.expenses||[]),{id:crypto.randomUUID(),description,amount,date,category:$('#opCat').value}];persist();closeModal();renderOperations();
 });
 $('#addAsset').onclick=()=>showModal('Register Equipment','Record an asset and its current condition.',`<label>Equipment name<input id="opName" maxlength="120"></label><label>Serial / Reference<input id="opRef" maxlength="80"></label><label>Condition<select id="opCondition"><option>Working</option><option>Needs repair</option><option>Retired</option></select></label>`,()=>{
 const name=$('#opName').value.trim();if(!name)return alert('Enter an equipment name.');
 data.assets=[...(data.assets||[]),{id:crypto.randomUUID(),name,reference:$('#opRef').value.trim(),condition:$('#opCondition').value}];persist();closeModal();renderOperations();
 });
 $('#downloadBackup').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify({app:'Ethan Digital Academy ERP',version:1,exportedAt:new Date().toISOString(),data},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='ETHAN-ERP-BACKUP-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
}
window.addEventListener('DOMContentLoaded',()=>{
 if(!window.ETHAN_BACKEND?.ready){
 const banner=document.createElement('div');banner.className='preview-banner';banner.textContent='ERP PREVIEW • Records are saved in this browser. Live academy data is not connected.';
 $('.main').prepend(banner);$('#logoutBtn').textContent='↻ Restart preview';$('#logoutBtn').onclick=()=>location.reload();
 }
});
