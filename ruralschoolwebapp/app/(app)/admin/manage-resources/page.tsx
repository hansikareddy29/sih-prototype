// // app/(app)/admin/manage-resources/page.tsx
// 'use client';
// import withRoleGuard from '../../../components/withRoleGuard';
// import styles from '../../Dashboard.module.css';
// function ManageResourcesPage() {
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Manage Resources</h1>
//       <p className={styles.subtitle}>Track stock and distribution of all resources.</p>
//       <div className={styles.card}>
//         {/* Resource list would be here */}
//         <p>Science Textbooks: 25 remaining</p>
//         <p>Uniform Sets: 60 remaining</p>
//       </div>
//     </div>
//   );
// }
// export default withRoleGuard(['admin'])(ManageResourcesPage);
// app/(app)/admin/manage-resources/page.tsx
'use client';
import { useState } from 'react'; // Import useState
import withRoleGuard from '../../../components/withRoleGuard';
import styles from '../../Dashboard.module.css'; // Assuming this CSS file exists and has some basic styling

// Initial mock data for resources
const initialResources = [
  { id: 1, name: 'Science Textbooks', quantity: 25 },
  { id: 2, name: 'Math Workbooks', quantity: 40 },
  { id: 3, name: 'Uniform Sets (Primary)', quantity: 60 },
  { id: 4, name: 'Uniform Sets (Secondary)', quantity: 35 },
  { id: 5, name: 'Art Supplies Kit', quantity: 15 },
  { id: 6, name: 'Sports Equipment Pack', quantity: 10 },
  { id: 7, name: 'Lab Coats', quantity: 30 },
  { id: 8, name: 'Projectors', quantity: 5 },
  { id: 9, name: 'Whiteboards', quantity: 8 },
  { id: 10, name: 'First Aid Kits', quantity: 3 },
];

function ManageResourcesPage() {
  const [resources, setResources] = useState(initialResources);
  const [newResourceName, setNewResourceName] = useState('');
  const [newResourceQuantity, setNewResourceQuantity] = useState('');
  const [error, setError] = useState('');

  const handleAddResource = () => {
    setError(''); // Clear previous errors
    if (!newResourceName.trim() || !newResourceQuantity) {
      setError('Resource name and quantity cannot be empty.');
      return;
    }

    const quantity = parseInt(newResourceQuantity, 10);
    if (isNaN(quantity) || quantity <= 0) {
      setError('Quantity must be a positive number.');
      return;
    }

    const newId = resources.length > 0
      ? Math.max(...resources.map(r => r.id)) + 1
      : 1;

    const newResource = {
      id: newId,
      name: newResourceName.trim(),
      quantity: quantity,
    };

    setResources([...resources, newResource]);
    setNewResourceName('');
    setNewResourceQuantity('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Resources</h1>
      <p className={styles.subtitle}>Track stock and distribution of all school resources.</p>

      {/* Display Existing Resources */}
      <div className={styles.card}>
        <h2>Current Resources</h2>
        {resources.length > 0 ? (
          <ul className={styles.resourceList}>
            {resources.map((resource) => (
              <li key={resource.id} className={styles.resourceItem}>
                <span>{resource.name}:</span>
                <span className={styles.resourceQuantity}>{resource.quantity} remaining</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No resources currently listed. Add some below!</p>
        )}
      </div>

      {/* Add New Resource Form */}
      <div className={styles.card} style={{ marginTop: '20px' }}>
        <h2>Add New Resource</h2>
        <div className={styles.addResourceForm}>
          <input
            type="text"
            placeholder="Resource Name (e.g., Biology Textbooks)"
            value={newResourceName}
            onChange={(e) => setNewResourceName(e.target.value)}
            className={styles.inputField}
          />
          <input
            type="number"
            placeholder="Quantity (e.g., 50)"
            value={newResourceQuantity}
            onChange={(e) => setNewResourceQuantity(e.target.value)}
            className={styles.inputField}
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button onClick={handleAddResource} className={styles.primaryButton}>
            Add Resource
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRoleGuard(['admin'])(ManageResourcesPage);