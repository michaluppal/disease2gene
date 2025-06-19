interface QueryField {
  keyword: string;
  field: string;
  exactPhrase: boolean;
  operator: 'AND' | 'OR';
}

export const fetchMockResearchResults = async (queryFields: QueryField[], pmids: string): Promise<Array<Record<string, any>>> => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Simulating query with fields:", queryFields, "and PMIDs/DOIs:", pmids);
      const mockData = [
        { id: 1, name: 'Result A', value: Math.random() * 100, status: 'Complete' },
        { id: 2, name: 'Result B', value: Math.random() * 100, status: 'Pending' },
        { id: 3, name: 'Result C', value: Math.random() * 100, status: 'Complete' },
      ];
      resolve(mockData);
    }, 1500);
  });
};