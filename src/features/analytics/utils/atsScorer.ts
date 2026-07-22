function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');
}

export interface ATSScoreResult {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export function calculateATSScore(jobKeywordsString: string, resumeSkillsString: string): ATSScoreResult {
  if (!jobKeywordsString || !resumeSkillsString) {
    return { score: 0, matchedSkills: [], missingSkills: [] };
  }

  const jobKeywordsArray = jobKeywordsString
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const resumeSkillsArray = resumeSkillsString
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (jobKeywordsArray.length === 0 || resumeSkillsArray.length === 0) {
    return { score: 0, matchedSkills: [], missingSkills: [] };
  }

  const normalizedResumeSkills = resumeSkillsArray.map(normalizeText);

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const keyword of jobKeywordsArray) {
    const normalizedKeyword = normalizeText(keyword);
    
    // Check if the job keyword exists in the resume skills array
    if (normalizedResumeSkills.includes(normalizedKeyword)) {
      matchedSkills.push(keyword);
    } else {
      missingSkills.push(keyword);
    }
  }

  const score = Math.round((matchedSkills.length / jobKeywordsArray.length) * 100);

  return {
    score,
    matchedSkills,
    missingSkills,
  };
}
