import { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import { IconPlay } from './Icons';
import { ErrorState } from './SectionStates';
import { useApp } from '../context/AppContext';
import './LiveBroadcast.css';

export function ScheduleList({ items = [], currentProgram }) {
  const { t } = useApp();

  return (
    <div className="live-schedule">
      <h3 className="live-schedule-title">{t.sections.schedule}</h3>

      <ul className="live-schedule-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`live-schedule-item ${item.isCurrent ? 'current' : ''}`}
          >
            <span className="live-schedule-time">{item.time}</span>
            <div className="live-schedule-info">
              <p className="live-schedule-name">{item.title}</p>
              <p className="live-schedule-sub">{item.subtitle}</p>
            </div>
            {item.isCurrent && (
              <span className="badge badge-live live-schedule-badge">
                <span className="live-badge-dot" aria-hidden="true" />
                {t.sections.nowLive}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LiveBroadcast() {
  const { t } = useApp();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedule = useCallback(async () => {
    try {
      setError(null);
      const data = await api.getSchedule();
      setSchedule(data);
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedule();

    // Auto-update program schedule every 60 seconds based on Asia/Tashkent time
    const interval = setInterval(() => {
      fetchSchedule();
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchSchedule]);

  const currentProgram = schedule.find((s) => s.isCurrent) || schedule[0];

  return (
    <section className="section live-section" id="efir" aria-label={t.sections.live}>
      <div className="section-header">
        <h2 className="section-title">{t.sections.live}</h2>
      </div>

      {error ? (
        <ErrorState
          title={t.states.errorTitle}
          message={error}
          onRetry={fetchSchedule}
        />
      ) : (
        <div className="live-container">
          {/* Player */}
          <div className="live-player">
            <div className="live-player-bg">
              <span className="live-player-watermark" aria-hidden="true">M</span>
            </div>

            {/* Pulsing live badge */}
            <span className="badge badge-live live-badge">
              <span className="live-badge-dot" aria-hidden="true" />
              {t.sections.liveBadge}
            </span>

            {/* Currently airing show title overlay */}
            {currentProgram && (
              <div className="live-player-info">
                <span className="live-player-subtitle">{currentProgram.time} • {t.sections.nowLive}</span>
                <p className="live-player-title">{currentProgram.title}</p>
              </div>
            )}

            {/* Large play button */}
            <button className="live-play-btn" aria-label={`${t.sections.live} ko'rish`}>
              <IconPlay size={32} />
            </button>
          </div>

          {/* Schedule list */}
          {loading ? (
            <div className="live-schedule skeleton-shimmer" style={{ height: 380 }} />
          ) : (
            <ScheduleList items={schedule} currentProgram={currentProgram} />
          )}
        </div>
      )}
    </section>
  );
}
